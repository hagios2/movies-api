/* eslint-disable import/prefer-default-export */
import express from 'express'
import cors from 'cors'
import routes from './Routes/router.js'

const app = express()

app.use(cors())

app.use(express.json())

// app.use(express.urlencoded({extended: true}))

app.use('/api', routes)

export { app }
