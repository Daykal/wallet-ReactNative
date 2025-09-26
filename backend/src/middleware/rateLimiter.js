import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "../lib/redis.js";

const rateLimit = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5, // Max 5 requests
  duration: 8, // Per 8 seconds
  blockDuration: 8, // Block for 8 seconds after exceeding limit
  keyPrefix: "rl:",
});

const rateLimiter = async (req, res, next) => {
  try {
    await rateLimit.consume(req.ip);
    next();
  } catch (rejRes) {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  }
};

export default rateLimiter;
