import routes from '@workspace/api'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { actions, middleware, pages } from 'astro/hono'

const app = new Hono()

app.use(logger())
app.use(actions())
app.use(middleware())
app.route('/', routes)
app.use(pages())

export default app
