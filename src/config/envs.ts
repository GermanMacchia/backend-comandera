import 'dotenv/config';
import * as joi from 'joi';

export interface EnvVars {
  APP_PORT: number;
  APP_CORS: string;
  DATABASE_URL: string;
  CACHE_MAX: number;
  CACHE_TTL: number;
  THROTTLE_ACTIVE: boolean;
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;
  JWT_SECRET: string;
  JWT_EXPIRE: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    APP_CORS: joi.string().default('*'),
    DATABASE_URL: joi.string().required(),
    CACHE_MAX: joi.number().default(50),
    CACHE_TTL: joi.number().default(60000),
    THROTTLE_ACTIVE: joi.boolean().default(false),
    THROTTLE_TTL: joi.number().default(600000),
    THROTTLE_LIMIT: joi.number().default(200),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRE: joi.number().default(12000),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;
