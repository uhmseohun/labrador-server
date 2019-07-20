import { Router } from 'express'

import models from '../models'
import messages from '../utils/messages'
import verify from '../utils/verify'
import requiredKeys from '../utils/requiredKeys'

const router = Router()

/**
 * @summary 자신의 기기를 모두 반환합니다.
 */
router.get('/', (req, res, next) => {
  models.Device.find({})
    .then(devices => {
      devices = devices.filter(v => v.owners.includes(req.user._id))
      res.json(devices)
    })
    .catch(error => {
      next(models.Error(500, dbError))
    })
})

/**
 * @summary 새로운 기기를 등록합니다.
 */
router.post('/', (req, res, next) => {
  if (!verify.keys(req, res, requiredKeys.createDevice)) {
    next(models.Error(400, messages.checkPayload))
  }
  let newDevice = models.Device()
  newDevice = Object.assign(newDevice, req.body)
  newDevice.save(error => {
    if (error) next(models.Error(500, messages.dbError))
    res.json({
      message: messages.success
    })
  })
})

/**
 * @summary 등록되어 있는 기기를 삭제합니다.
 * 기기 소유자만 접근할 수 있습니다.
 */
router.delete('/:deviceId', (req, res, next) => {
  models.Device.deleteOne({ _id: req.params.deviceId })
    .then(result => {
      if (!result.deletedCount) {
        return next(models.Error(404, messages.deviceNotExist))
      }
      res.json({
        message: messages.success
      }) 
    })
    .catch(error => {
      next(models.Error(500, messages.dbError))
    })
})

/**
 * @summary 등록되어 있는 기기의 정보를 수정합니다.
 * 기기 소유자만 접근할 수 있습니다.
 */
router.put('/:deviceId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

export default router
