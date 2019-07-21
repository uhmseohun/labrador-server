import jwt from 'jsonwebtoken'

import models from '../../models'
import responses from '../responses'

export default async (req, res, next) => {
  if (req.originalUrl === '/auth' || req.originalUrl === '/auth/join') return next()

  const user = jwt.verify(req.headers.authorization, req.app.get('secretKey'))

  await models.User.findOne({ id: user.id })
    .then(user => {
      if (!user) next(responses.unknownError)
      req.user = {
        _id: user._id,
        id: user.id,
        name: user.name,
        permission: user.permission
      }
    })
    .catch(error => next(error))

  next()
}
