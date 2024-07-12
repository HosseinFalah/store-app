const redisDB = require('redis');

const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on('connect', () => console.log("Connect to Redis!"));
redisClient.on('ready', (err) => console.log("connected to redis and ready to use ..."));
redisClient.on('error', (err) => console.log("Redis Error", err.message));
redisClient.on('end', () => console.log("disconnected from redis ..."));

module.exports = redisClient;