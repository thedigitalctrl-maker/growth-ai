import { ProfileAnalysis, ConnectionRecommendation } from '../types';

const MOCK_CONNECTIONS: ConnectionRecommendation[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    headline: 'Senior Product Manager at TechCorp',
    profileUrl: 'https://linkedin.com/in/sarahmitchell',
    reason: 'Shared industry focus and mutual connections'
  },
  {
    id: '2',
    name: 'James Chen',
    headline: 'Engineering Lead at StartupXYZ',
    profileUrl: 'https://linkedin.com/in/jameschen',
    reason: 'Similar career trajectory and interests'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    headline: 'VP of Marketing at GrowthCo',
    profileUrl: 'https://linkedin.com/in/emilyrodriguez',
    reason: 'Complementary skills and industry presence'
  },
  {
    id: '4',
    name: 'Michael Park',
    headline: 'Founder at AI Ventures',
    profileUrl: 'https://linkedin.com/in/michaelpark',
    reason: 'Active in your areas of interest'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    headline: 'Director of Engineering at BigTech',
    profileUrl: 'https://linkedin.com/in/lisathompson',
    reason: 'Thought leader in your field'
  }
];

export async function analyzeProfile(profileUrl: string): Promise<ProfileAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock analysis based on URL patterns
  let intent: ProfileAnalysis['intent'] = 'Networking';
  
  if (profileUrl.toLowerCase().includes('job') || profileUrl.toLowerCase().includes('hire')) {
    intent = 'Job Seeker';
  } else if (profileUrl.toLowerCase().includes('founder') || profileUrl.toLowerCase().includes('ceo')) {
    intent = 'Funding Seeker';
  } else if (profileUrl.toLowerCase().includes('sales') || profileUrl.toLowerCase().includes('account')) {
    intent = 'Sales Prospecting';
  }

  const insights: string[] = [
    'Profile shows consistent engagement with industry content',
    'Connection strategy focuses on quality over quantity',
    'Recent activity indicates active networking phase'
  ];

  return {
    name: 'LinkedIn User',
    headline: 'Professional | Making meaningful connections',
    intent,
    confidence: 85,
    insights,
    recommendations: MOCK_CONNECTIONS.slice(0, 5)
  };
}