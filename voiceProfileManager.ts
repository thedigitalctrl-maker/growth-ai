import type { VoiceProfile } from "../types";

const STORAGE_KEYS = {
  profile: 'growthai_voice_profile',
  trainingComplete: 'growthai_training_complete'
};

export function isTrainingComplete(): boolean {
  return localStorage.getItem(STORAGE_KEYS.trainingComplete) === 'true';
}

export function setTrainingComplete(): void {
  localStorage.setItem(STORAGE_KEYS.trainingComplete, 'true');
}

export function getVoiceProfile(): VoiceProfile | null {
  const stored = localStorage.getItem(STORAGE_KEYS.profile);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as VoiceProfile;
  } catch {
    return null;
  }
}

export function saveVoiceProfile(profile: VoiceProfile): void {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function clearVoiceProfile(): void {
  localStorage.removeItem(STORAGE_KEYS.profile);
  localStorage.removeItem(STORAGE_KEYS.trainingComplete);
}

// Default profile for users who skip training
export function getDefaultProfile(): VoiceProfile {
  return {
    tonality: "professional yet conversational",
    commonWords: ["great", "insightful", "thanks", "appreciate", "perspective"],
    fillers: ["Great post!", "Thanks for sharing"],
    sentenceLength: "medium",
    emojiUsage: "occasional",
    emojiList: ["👍", "💡", "🚀"],
    punctuationStyle: "standard with occasional exclamation marks",
    signaturePhrases: ["Thanks for sharing this perspective!"],
    exampleSentence: "Great insights here! Thanks for breaking this down so clearly."
  };
}

// Mock AI analysis - in production, this would call an AI API
export async function analyzeVoiceProfile(
  comment1: string,
  comment2: string,
  comment3: string
): Promise<VoiceProfile> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const allComments = `${comment1} ${comment2} ${comment3}`.toLowerCase();
  
  // Simple analysis logic (mock)
  const words = allComments.split(/\s+/).filter(w => w.length > 3);
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  // Detect emoji usage
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
  const emojis = allComments.match(emojiRegex) || [];
  const uniqueEmojis = [...new Set(emojis)];

  // Detect sentence length preference
  const sentences = [comment1, comment2, comment3].flatMap(c => c.split(/[.!?]+/).filter(s => s.trim()));
  const avgLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
  
  let sentenceLength: 'short' | 'medium' | 'long' = 'medium';
  if (avgLength < 10) sentenceLength = 'short';
  else if (avgLength > 20) sentenceLength = 'long';

  // Detect emoji usage level
  let emojiUsage: 'none' | 'occasional' | 'frequent' = 'none';
  if (emojis.length >= 3) emojiUsage = 'frequent';
  else if (emojis.length > 0) emojiUsage = 'occasional';

  // Detect punctuation style
  const exclamations = (allComments.match(/!/g) || []).length;
  const questions = (allComments.match(/\?/g) || []).length;
  let punctuationStyle = "standard periods";
  if (exclamations > 2) punctuationStyle = "enthusiastic with exclamation marks";
  else if (questions > 1) punctuationStyle = "inquisitive with questions";

  // Detect fillers
  const fillers: string[] = [];
  const fillerPatterns = [
    /\bhonestly[,.]?\s*/gi,
    /\bi think\s*/gi,
    /\bjust my\s*(two cents|thoughts)/gi,
    /\bin my experience/gi,
    /\bactually[,.]?\s*/gi
  ];
  
  fillerPatterns.forEach(pattern => {
    const match = allComments.match(pattern);
    if (match) fillers.push(match[0].trim());
  });

  // Determine tonality based on analysis
  let tonality = "professional with warmth";
  if (emojiUsage === 'frequent' && exclamations > 2) {
    tonality = "enthusiastic and friendly";
  } else if (fillers.length > 0) {
    tonality = "conversational and authentic";
  } else if (sentenceLength === 'short') {
    tonality = "direct and concise";
  }

  return {
    tonality,
    commonWords: topWords.length > 0 ? topWords : ["great", "thanks", "insightful", "appreciate", "perspective"],
    fillers: fillers.length > 0 ? fillers : ["Great post!"],
    sentenceLength,
    emojiUsage,
    emojiList: uniqueEmojis.length > 0 ? uniqueEmojis : ["👍", "💡"],
    punctuationStyle,
    signaturePhrases: [comment1.slice(0, 50) + "..."],
    exampleSentence: generateExampleSentence(tonality, sentenceLength, emojiUsage, uniqueEmojis[0])
  };
}

function generateExampleSentence(
  tonality: string,
  length: 'short' | 'medium' | 'long',
  emojiUsage: 'none' | 'occasional' | 'frequent',
  emoji?: string
): string {
  const examples = {
    short: emojiUsage !== 'none' 
      ? `Great point! ${emoji || '👍'}`
      : "Solid perspective shared here.",
    medium: emojiUsage !== 'none'
      ? `This really resonates with me. Thanks for breaking it down so clearly! ${emoji || '💡'}`
      : "This really resonates with me. Thanks for breaking it down so clearly.",
    long: emojiUsage !== 'none'
      ? `What a thoughtful take on this topic. I've seen similar patterns in my work, and your analysis really helps clarify the key points. Looking forward to more insights like this! ${emoji || '🚀'}`
      : "What a thoughtful take on this topic. I've seen similar patterns in my work, and your analysis really helps clarify the key points. Looking forward to more insights like this!"
  };
  
  return examples[length];
}