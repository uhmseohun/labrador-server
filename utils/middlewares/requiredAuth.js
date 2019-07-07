import messages from '../messages'
import models from '../../models'

import jwt from 'jsonwebtoken'

/**
 * @summary 각 라우트에 접근하기 전 사용자 인증을 하는 미들웨어입니다.
 */
export default (req, res, next) => {
  if (req.originalUrl === '/auth' || req.originalUrl === '/auth/join') return next()

  if (!req.headers.authorization) {
    return next(models.Error(403, messages.failAuth))
  }

  const token = req.headers.authorization.slice(7)
  try {
    jwt.verify(token, req.app.get('secretKey'))
  } catch (error) {
    return next(models.Error(403, messages.failAuth))
  }

  next()
}
