import { Router } from 'express'
import multer from 'multer'
import path from 'path'

import responses from '../utils/responses'
import models from '../models'

const router = Router()

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, process.env.PHOTODIR)
  },
  filename (req, file, cb) {
    cb(null, req.params.id +
      path.extname(file.originalname))
  }
})
const upload = multer({ storage })

router.post('/photo/:id', upload.single('photo'), async (req, res, next) => {
  try {
    const target = await models.Place.findById(req.params.id) ||
      await models.Device.findById(req.params.id) ||
      await models.User.findById(req.params.id)

    if (!target) {
      return next(responses.targetNotFound)
    }

    target.photo = req.file.filename
    target.save()
      .then(() => next(responses.success))
  } catch (error) {
    next(error)
  }
})

export default router
