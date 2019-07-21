import responses from '../responses'

import jwt from 'jsonwebtoken'

/**
 * @summary 각 라우트에 접근하기 전 사용자 인증을 하는 미들웨어입니다.
 */
export default (req, res, next) => {
  if (req.originalUrl === '/auth' ||
    req.originalUrl === '/auth/join') return next()

  if (!req.headers.authorization) {
    return next(responses.failAuth)
  }

  const token = req.headers.authorization
  try {
    jwt.verify(token, req.app.get('secretKey'))
  } catch (error) {
    return next(responses.failAuth)
  }

  next()
}
