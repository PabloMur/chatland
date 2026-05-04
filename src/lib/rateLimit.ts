type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSecs: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSecs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterSecs = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSecs };
  }

  entry.count++;
  return { allowed: true, retryAfterSecs: 0 };
}

export function resetRateLimit(key: string) {
  store.delete(key);
}
