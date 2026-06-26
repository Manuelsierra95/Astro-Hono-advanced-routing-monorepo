import type { AppType } from '@workspace/api'
import { hc } from 'hono/client'

export const createClient = (origin: string) =>
  hc<AppType>(origin, {
    init: {
      credentials: 'include',
    },
  })

export type HonoClient = ReturnType<typeof createClient>
