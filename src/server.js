import log from './Logger/logger.js'
// import connection from './config/db.js'
import { app } from './app.js'

const { PORT } = process.env

app.listen(PORT, async () => {
  log.info(`server running on port ${PORT}`)
})
