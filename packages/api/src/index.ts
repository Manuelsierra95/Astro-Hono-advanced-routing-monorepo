import { Hono } from 'hono'
import { helloRoute } from './routes/hello'

const routes = new Hono().basePath('api').route('/hello', helloRoute)

export type AppType = typeof routes
export default routes
