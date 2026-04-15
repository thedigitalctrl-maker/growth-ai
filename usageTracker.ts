const DAILY_LIMIT = 10;

function getStorageKey(): string {
  return `growthai_usage_${new Date().toDateString()}`;
}

export function checkDailyUsage(): { used: number; remaining: number; canGenerate: boolean } {
  const key = getStorageKey();
  const stored = localStorage.getItem(key);
  const used = stored ? parseInt(stored, 10) : 0;
  
  return {
    used,
    remaining: Math.max(0, DAILY_LIMIT - used),
    canGenerate: used < DAILY_LIMIT
  };
}

export function incrementUsage(): number {
  const key = getStorageKey();
  const current = localStorage.getItem(key);
  const newCount = current ? parseInt(current, 10) + 1 : 1;
  localStorage.setItem(key, newCount.toString());
  
  return newCount;
}

export function getUsagePercentage(): number {
  const { used } = checkDailyUsage();
  return Math.min(100, (used / DAILY_LIMIT) * 100);
}