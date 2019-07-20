import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import routes from './routes'
import models from './models'
import messages from './utils/messages'
import middlewares from './utils/middlewares'

const app = express()

dotenv.config({ path: 'env/server.env' })

app.set('secretKey', process.env.JSONSECRETKEY)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(middlewares.requiredAuth)
app.use(middlewares.attachUserInfo)

app.use('/auth', routes.auth)
app.use('/device', routes.device)
app.use('/user', routes.user)
app.use('/place', routes.place)

app.use((req, res, next) => {
  next(models.Error(404, messages.apiNotExist))
})

app.use((error, req, res, next) => {
  if (!error.code) {
    console.error(error)
    return res.status(500).json({
      message: messages.unknownError
    })
  }
  res.status(error.code).json({
    message: error.message
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
