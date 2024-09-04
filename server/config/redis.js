require("dotenv").config()
const Redis = require("ioredis")

const redis = new Redis({
  port: 18948,
  host: "redis-18948.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
  username: "default",
  password: process.env.PASSWORD_REDIS,
  db: 0
});

module.exports = redis