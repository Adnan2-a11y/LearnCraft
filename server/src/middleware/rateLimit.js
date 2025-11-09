// src/middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

// If you want Redis support, require the redis store conditionally
let RedisStore;
let IORedis;
if (process.env.RATE_LIMIT_STORE === 'redis') {
  // require at runtime so dev without redis doesn't fail
  RedisStore = (await import('rate-limit-redis')).default;
  IORedis = (await import('ioredis')).default;
}

/**
 * Helper: build store for distributed environments (Redis) or undefined for memory store.
 * For single-instance (development), fallback to memory store provided by express-rate-limit.
 */
const buildStore = () => {
  if (process.env.RATE_LIMIT_STORE === 'redis') {
    const redisClient = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
    return new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }
  return undefined; // memory store (not recommended for prod)
};

/**
 * Generic options to show to clients via Retry-After header
 * and common response JSON shape.
 */
const defaultHandler = (req, res) => {
  res.set('Retry-After', String(Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000)));
  res.status(429).json({
    success: false,
    message: 'Too many requests. Please try again later.',
  });
};

// ------------------ Rate limiter instances ------------------

// 1) Global limiter: light protection for all routes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
  handler: defaultHandler,
  store: buildStore(),
});

// 2) Strict limiter for login route — small window to prevent brute force
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // limit each IP to 5 login requests per windowMs
  message: { success: false, message: 'Too many login attempts. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
  store: buildStore(),
});

// 3) Register limiter — prevents mass account creation
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,                  // limit each IP to 10 registration requests per windowMs
  message: { success: false, message: 'Too many accounts created from this IP, try later.' },
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
  store: buildStore(),
});

/**
 * Factory: create a custom limiter if you want different settings per route at runtime.
 * Example: createLimiter({ windowMs: 60000, max: 20 })
 */
export const createLimiter = (opts) => rateLimit({
  windowMs: opts.windowMs || 15 * 60 * 1000,
  max: opts.max || 100,
  handler: opts.handler || defaultHandler,
  standardHeaders: true,
  legacyHeaders: false,
  store: buildStore(),
});
