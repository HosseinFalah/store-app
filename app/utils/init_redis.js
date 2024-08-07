const redis = require('redis');

const initRedis = () => {
    const redisClient = redis.createClient()
    redisClient.connect();
  
    redisClient.on('connect', () => {
        console.log('✅ —> Connected to Redis')
    })
  
    redisClient.on('ready', () => {
        console.log('✅ —> Redis is ready to use')
    })
  
    redisClient.on('error', err => {
        console.error('❌ —> Redis Error:', err.message)
    })
  
    redisClient.on('end', () => {
        console.log('❌ —> Redis disconnected!')
    })
  
    return redisClient
}

module.exports = {
    initRedis
}