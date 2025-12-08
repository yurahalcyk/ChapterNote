import { NODE_ENV, PORT } from './env.ts';

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(PORT) || 3000,
  nodeEnv: NODE_ENV || 'development',
};

export default config;
