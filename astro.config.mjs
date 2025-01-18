// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),
   react({
    experimentalReactChildren: true,
    include: ['**/react/*'], // if you don't set this, tsx files conflict while processing ( react and preact trying to process same file at the same time !)
  }),
  // preact({
  //   compat: true,
  //   devtools: true,
  //   include: ['**/preact/*'],
  // })
  ],
  adapter: netlify()
});