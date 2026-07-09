import { Hono } from 'hono'
import { helloRoute } from './routes/hello'
import { stravaRoute } from './routes/strava'

const routes = new Hono()
  .basePath('api')
  .route('/hello', helloRoute)
  .route('/auth', stravaRoute)

export type AppType = typeof routes
export default routes
