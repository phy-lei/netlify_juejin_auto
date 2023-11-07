import { defineConfig } from 'astro/config';
import 'dotenv/config';
import cron from 'node-cron';
import netlify from '@astrojs/netlify/functions';
import node from '@astrojs/node';
import autoProcess from './src/process/start';

cron.schedule(process.env.CRON_EXPRESSION, () => {
  autoProcess();
});

const envAdapter = () => {
  switch (process.env.OUTPUT) {
    case 'netlify':
      return netlify({
        edgeMiddleware: true,
      });
    default:
      return node({ mode: 'standalone' });
  }
};

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: envAdapter(),
});
