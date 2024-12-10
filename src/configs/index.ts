import { EnvConfigInterface, ObjectGeneric } from '../interfaces';
import development from './config.dev';

const ENV = process.env.NODE_ENV || 'development';

function getEnvConfig(): ObjectGeneric {
  const envs: ObjectGeneric = { development };

  return envs[ENV];
}

export const envConfigs = getEnvConfig() as EnvConfigInterface;