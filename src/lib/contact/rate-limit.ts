const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  timestamps: number[];
};

type RateLimitStore = Map<string, RateLimitEntry>;

const globalStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: RateLimitStore;
};

function getStore(): RateLimitStore {
  if (!globalStore.__contactRateLimitStore) {
    globalStore.__contactRateLimitStore = new Map();
  }
  return globalStore.__contactRateLimitStore;
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
};

export function checkContactRateLimit(ip: string): RateLimitResult {
  const store = getStore();
  const now = Date.now();
  const entry = store.get(ip) ?? { timestamps: [] };

  const recent = entry.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000
    );
    store.set(ip, { timestamps: recent });
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  recent.push(now);
  store.set(ip, { timestamps: recent });

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - recent.length,
  };
}
