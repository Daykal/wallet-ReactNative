import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
let redisClient;
if (!global.redisClient) {
  global.redisClient = new Redis(process.env.REDIS_URL);
}

redisClient = global.redisClient;

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export default redisClient;
