import { ToneType, CommentSuggestion } from '../types';

const TONE_EXAMPLES: Record<ToneType, string[]> = {
  humorous: [
    "This reminds me of the time I spent three hours debugging a semicolon. Worth every minute for the lesson learned.",
    "If there's one thing experience has taught me, it's that the best solutions often come from the simplest questions.",
    "I needed this perspective today. It's easy to overcomplicate things when the answer was right there all along."
  ],
  funny: [
    "Plot twist: the real insight was the colleagues we made along the way.",
    "This is the kind of content that makes me scroll past everything else. Well said.",
    "Appreciate you sharing this. It's exactly what I needed to read between meetings."
  ],
  debate: [
    "Interesting perspective. I'd offer a slightly different view based on my experience in this space.",
    "While I agree with the overall premise, there's an important nuance worth considering here.",
    "This raises a valid point. However, I've seen different outcomes in practice that might add to this discussion."
  ],
  professional: [
    "Thank you for sharing this insight. Your analysis aligns with what I've observed in the industry.",
    "This is a well-structured perspective. The points you've raised are particularly relevant for professionals navigating this space.",
    "Appreciate the thoughtful breakdown. This adds real value to the conversation."
  ],
  'general-short': [
    "Great insight. Thanks for sharing.",
    "This resonates. Well said.",
    "Appreciate this perspective."
  ]
};

export function generateSuggestions(postText: string, tone: ToneType): CommentSuggestion[] {
  const examples = TONE_EXAMPLES[tone];
  
  return [
    {
      id: '1',
      text: examples[0],
      tone,
      isBestMatch: true
    },
    {
      id: '2',
      text: examples[1],
      tone,
      isBestMatch: false
    },
    {
      id: '3',
      text: examples[2],
      tone,
      isBestMatch: false
    }
  ];
}