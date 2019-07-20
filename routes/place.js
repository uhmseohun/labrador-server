import { Router } from 'express'

import models from '../models'
import messages from '../utils/messages'

const router = Router()

/**
 * @summary 등록되어 있는 모든 장소들을 반환합니다.
 */
router.get('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 새로운 장소를 등록합니다.
 */
router.post('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 등록되어 있는 장소를 삭제합니다.
 * 장소의 관리자만 접근할 수 있습니다.
 */
router.delete('/:placeId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 등록되어 있는 장소의 정보를 수정합니다.
 * 장소의 관리자만 접근할 수 있습니다.
 */
router.put('/:deviceId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

export default router
