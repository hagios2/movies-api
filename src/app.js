import express from 'express'
import cors from 'cors'
import routes from './Routes/router.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', routes)

export { app }
