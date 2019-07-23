import { Router } from 'express'

import models from '../models'
import responses from '../utils/responses'

const router = Router()

router.get('/', (req, res, next) => {
  models.Notification.find({ to: { $in: [req.user._id] } })
    .then(noties => res.json(noties))
    .catch(error => next(error))
})

router.delete('/:notiId', (req, res, next) => {
  models.Notification.findById(req.params.notiId)
    .then(noti => {
      if (!noti) return next(responses.notiNotExist)
      if (!noti.to.includes(req.user._id)) return next(responses.noPermission)
      noti.delete()
        .then(() => next(responses.success))
    })
})

export default router
