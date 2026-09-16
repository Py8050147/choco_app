import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://cool-cowbird-150579.upstash.io',
  token: 'gQAAAAAAAkwzAAIgcDJmYThiNmIzNmRkOTU0ZDIzOGJmNGJhYmI0NTg1N2EyMw',
})


export default redis;
