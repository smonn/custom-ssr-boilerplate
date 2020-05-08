import client from './webpack/client';
import server from './webpack/server';
import { Configuration } from 'webpack';

interface EnvironmentOptions {
  target?: 'server' | 'client';
}

export default function selectConfig(env?: EnvironmentOptions): Configuration {
  if (!env) {
    throw new Error('Specify --env.target=... flag');
  }

  if (env.target === 'client') {
    return client;
  }
  if (env.target === 'server') {
    return server;
  }

  throw new Error(
    `Invalid target: "${env.target}", expected on of "client" and "server"`
  );
}
