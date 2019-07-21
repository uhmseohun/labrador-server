import { Router } from 'express'

import models from '../models'
import responses from '../utils/responses'
import verify from '../utils/verify'
import requiredKeys from '../utils/requiredKeys'

const router = Router()

/**
 * @summary 등록되어 있는 모든 장소들을 반환합니다.
 */
router.get('/', (req, res, next) => {
  models.Place.find({})
    .then(places => res.json(places))
    .catch(error => next(error))
})

/**
 * @summary 새로운 장소를 등록합니다.
 */
router.post('/', (req, res, next) => {
  if (!verify.keys(req, res, requiredKeys.createPlace)) {
    return next(responses.checkPayload)
  }

  let newPlace = new models.Place()
  newPlace = Object.assign(newPlace, req.body)
  newPlace.registrar = [req.user._id]

  newPlace.save()
    .then(() => next(responses.success))
    .catch(error => next(error))
})

/**
 * @summary 등록되어 있는 장소를 삭제합니다.
 * 장소의 관리자만 접근할 수 있습니다.
 */
router.delete('/:placeId', (req, res, next) => {
  models.Place.findById(req.params.placeId)
    .then(place => {
      if (!place) return next(responses.placeNotExist)
      if (!place.registrar.includes(req.user._id)) {
        return next(responses.noPermission)
      }

      place.remove()
      next(responses.success)
    })
    .catch(error => next(error))
})

/**
 * @summary 등록되어 있는 장소의 정보를 수정합니다.
 * 장소의 관리자만 접근할 수 있습니다.
 */
router.put('/:placeId', (req, res, next) => {
  models.Place.findById(req.params.placeId)
    .then(place => {
      if (!place) return next(responses.placeNotExist)
      if (!place.registrar.includes(req.user._id)) {
        return next(responses.noPermission)
      }

      requiredKeys.editPlace.forEach(v => {
        place[v] = req.body[v]
      })

      place.save()
      next(responses.success)
    })
    .catch(error => next(error))
})

export default router
