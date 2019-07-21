import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import routes from './routes'
import responses from './utils/responses'
import messages from './utils/messages'
import middlewares from './utils/middlewares'

const app = express()

dotenv.config({ path: 'env/server.env' })

app.set('secretKey', process.env.JWTSECRETKEY)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(middlewares.requiredAuth)
app.use(middlewares.attachUserInfo)

app.use('/auth', routes.auth)
app.use('/device', routes.device)
app.use('/user', routes.user)
app.use('/place', routes.place)
app.use('/labrador', routes.labrador)

app.use((req, res, next) => {
  next(responses.apiNotExist)
})

app.use((response, req, res, next) => {
  res.status(response.code || 500).json({
    message: response.message || messages.unknownError
  })
})

mongoose.connect('mongodb://localhost/labrador',
  { useNewUrlParser: true },
  error => {
    if (error) console.error(error)
    else console.log('MongoDB for Larbrador Connected')
  })

const port = process.env.PORT
app.listen(port, () => {
  console.log(`LARBRADOR SERVER IS RUNNING ON PORT ${port}`)
})
