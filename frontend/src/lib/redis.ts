// app/lib/redis.js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // Use REDIS_URL for the Redis connection string

export default redis;
