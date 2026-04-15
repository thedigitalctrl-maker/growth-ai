const STORAGE_KEYS = {
  voiceProfile: 'growthai_voice_profile',
  trainingComplete: 'growthai_training_complete',
  dailyUsage: 'growthai_daily_usage',
  usageDate: 'growthai_usage_date'
};

export function getVoiceProfile(): VoiceProfile | null {
  const stored = localStorage.getItem(STORAGE_KEYS.voiceProfile);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveVoiceProfile(profile: VoiceProfile): void {
  localStorage.setItem(STORAGE_KEYS.voiceProfile, JSON.stringify(profile));
}

export function isTrainingComplete(): boolean {
  return localStorage.getItem(STORAGE_KEYS.trainingComplete) === 'true';
}

export function setTrainingComplete(): void {
  localStorage.setItem(STORAGE_KEYS.trainingComplete, 'true');
}

export function getDailyUsage(): { used: number; date: string } {
  const stored = localStorage.getItem(STORAGE_KEYS.dailyUsage);
  const date = localStorage.getItem(STORAGE_KEYS.usageDate) || '';
  
  if (!stored) {
    return { used: 0, date: '' };
  }
  
  try {
    return { used: parseInt(stored, 10), date };
  } catch {
    return { used: 0, date: '' };
  }
}

export function incrementUsage(): number {
  const today = new Date().toDateString();
  const { used, date } = getDailyUsage();
  
  let newUsed = 1;
  if (date === today) {
    newUsed = used + 1;
  }
  
  localStorage.setItem(STORAGE_KEYS.dailyUsage, newUsed.toString());
  localStorage.setItem(STORAGE_KEYS.usageDate, today);
  
  return newUsed;
}

export function canGenerate(): boolean {
  const today = new Date().toDateString();
  const { used, date } = getDailyUsage();
  
  if (date !== today) {
    return true;
  }
  
  return used < 10;
}

export function getUsageCount(): number {
  const today = new Date().toDateString();
  const { used, date } = getDailyUsage();
  
  if (date !== today) {
    return 0;
  }
  
  return used;
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}