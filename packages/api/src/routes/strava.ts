import { Hono } from 'hono'

const CLIENT_ID = import.meta.env.STRAVA_CLIENT_ID!
const CLIENT_SECRET = import.meta.env.STRAVA_CLIENT_SECRET!
const REDIRECT_URI = import.meta.env.STRAVA_REDIRECT_URI!

export const stravaRoute = new Hono()
  .get('/strava', (c) => {
    const url = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&approval_prompt=auto&scope=activity:read_all`

    return c.redirect(url)
  })

  // 2. Callback → intercambiar code por access_token
  .get('/strava/callback', async (c) => {
    const code = c.req.query('code')

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    })

    const data = await res.json()

    // ⚠️ En producción guarda esto en DB
    const accessToken = data.access_token

    // Rediriges a un endpoint tuyo para ver actividades
    return c.redirect(`/?token=${accessToken}`)
  })

  // 3. Obtener actividades del usuario
  .get('/activities', async (c) => {
    const token = c.req.query('token')

    const res = await fetch(
      'https://www.strava.com/api/v3/athlete/activities',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const activities = await res.json()

    return c.json(activities)
  })
