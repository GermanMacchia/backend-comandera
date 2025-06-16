// import { Dialect } from 'sequelize';
import { envVars } from './envs';

const splitCors = (cors: string) => (cors === '*' ? '*' : cors.split(','));

export const config = () => ({
  app: {
    jwt_expire: envVars.JWT_EXPIRE,
    jwt_secret: envVars.JWT_SECRET,
    port: envVars.APP_PORT,
    cors: {
      origin: splitCors(envVars.APP_CORS),
      methods: 'GET,POST,PATCH,DELETE',
    },
  },
  database: {
    url: envVars.DATABASE_URL,
  },
  cache: {
    store: 'memory',
    isGlobal: true,
    ttl: envVars.CACHE_TTL,
    max: envVars.CACHE_MAX,
  },
  throttle: {
    active: envVars.THROTTLE_ACTIVE,
    list: [
      {
        ttl: envVars.THROTTLE_TTL,
        limit: envVars.THROTTLE_LIMIT,
      },
    ],
  },
});
