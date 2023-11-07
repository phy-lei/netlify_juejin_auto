import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import node from '@astrojs/node';

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
