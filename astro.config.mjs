// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),
   react({
    experimentalReactChildren: true
  }),
  preact({
    compat: true,
    devtools: true
  })],
  adapter: netlify()
});