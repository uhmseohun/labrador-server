import jwt from 'jsonwebtoken'

import models from '../../models'
import messages from '../messages'

export default async (req, res, next) => {
  if (req.originalUrl === '/auth' || req.originalUrl === '/auth/join') return next()

  const user = jwt.verify(req.headers.authorization, req.app.get('secretKey'))

  await models.User.findOne({ id: user.id })
    .then(user => {
      if (!user) next(models.Error(500, messages.unknownError))
      req.user = user
    })
    .catch(error => {
      next(models.Error(500, messages.dbError))
    })

  next()
}
