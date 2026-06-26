// @ts-check
import { defineConfig } from 'astro/config'
import bun from '@wyattjoh/astro-bun-adapter'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server',
  adapter: bun(),
})
