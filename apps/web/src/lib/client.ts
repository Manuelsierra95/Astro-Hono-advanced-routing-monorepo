import type { AppType } from '@workspace/api'
import { hc } from 'hono/client'

const origin = import.meta.env.SITE || 'http://localhost:4321'

export const client = hc<AppType>(origin, {
  init: { credentials: 'include' },
})

export type Client = typeof client
