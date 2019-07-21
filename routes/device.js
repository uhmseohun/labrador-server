import { Router } from 'express'

import models from '../models'
import responses from '../utils/responses'
import verify from '../utils/verify'
import requiredKeys from '../utils/requiredKeys'

const router = Router()

/**
 * @summary 자신의 기기를 모두 반환합니다.
 */
router.get('/', (req, res, next) => {
  models.Device.find({})
    .then(devices => {
      devices = devices
        .filter(v => v.owners.includes(req.user._id))

      res.json(devices)
    })
    .catch(error => next(error))
})

/**
 * @summary 새로운 기기를 등록합니다.
 */
router.post('/', (req, res, next) => {
  if (!verify.keys(req, res, requiredKeys.createDevice)) {
    next(responses.checkPayload)
  }
  let newDevice = models.Device()
  newDevice = Object.assign(newDevice, req.body)
  newDevice.owners = [req.user]
  newDevice.save()
    .then(() => next(responses.success))
    .catch(error => next(error))
})

/**
 * @summary 등록되어 있는 기기를 삭제합니다.
 * 기기 소유자만 접근할 수 있습니다.
 */
router.delete('/:deviceId', (req, res, next) => {
  models.Device.findById(req.params.deviceId)
    .then(device => {
      if (!device) return next(responses.deviceNotExist)
      if (!device.owners.includes(req.user._id)) {
        return next(responses.noPermission)
      }

      device.remove()
      next(responses.success)
    })
    .catch(error => next(error))
})

/**
 * @summary 등록되어 있는 기기의 정보를 수정합니다.
 * 기기 소유자만 접근할 수 있습니다.
 */
router.put('/:deviceId', (req, res, next) => {
  next(responses.underDev)
})

export default router
