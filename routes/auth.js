import { Router } from 'express'

import verify from '../utils/verify'
import models from '../models'
import messages from '../utils/messages'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const router = Router()

/**
 * @summary 아이디와 패스워드를 받아 토큰을 발급해 반환합니다.
 */
router.post('/', (req, res, next) => {
  if (!verify.keys(req, res, ['id', 'password'])) {
    return next(models.Error(400, messages.checkPayload))
  }
  let hashedPw = crypto.createHash('sha256')
  hashedPw.update(req.body.password)
  hashedPw = hashedPw.digest('base64')

  models.User.findOne({ id: req.body.id, password: hashedPw })
    .then(user => {
      if (!user) return next(models.Error(404, messages.checkAccount))

      const accessToken = jwt.sign({
        id: user.id,
        name: user.name,
        permission: user.permission
      }, req.app.get('secretKey'), {
        expiresIn: 60 * 60 * 24
      })

      const refreshToken = jwt.sign({
        id: user.id
      }, req.app.get('secretKey'), {
        expiresIn: 60 * 60 * 24 * 14
      })

      res.json({
        accessToken,
        refreshToken
      })
    })
    .catch(error => {
      next(models.Error(500, messages.dbError))
    })
})

/**
 * @summary 리프레시 토큰으로 액세스 토큰을 재발급합니다.
 */
router.post('/refresh', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 사용자 정보를 받아 새로운 사용자를 생성합니다.
 */
router.post('/join', (req, res, next) => {
  if (!verify.keys(req, res, ['id', 'password', 'name'])) {
    return next(models.Error(400, messages.checkPayload))
  }
  models.User.findOne({ id: req.body.id })
    .then(user => {
      if (user) return next(models.Error(409, messages.duplicatedId))
      let newUser = new models.User()
      newUser.id = req.body.id
      newUser.name = req.body.name

      let hashedPw = crypto.createHash('sha256')
      hashedPw.update(req.body.password)
      hashedPw = hashedPw.digest('base64')
      newUser.password = hashedPw
      newUser.save(() => {
        res.json({ message: messages.success })
      })
    })
    .catch(error => {
      return next(models.Error(500, messages.dbError))
    })
})

export default router
