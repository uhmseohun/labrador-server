import { Router } from 'express'

import models from '../models'
import messages from '../utils/messages'

const router = Router()

/**
 * @summary 자신의 기기를 모두 반환합니다.
 */
router.get('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 새로운 기기를 등록합니다.
 */
router.post('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 등록되어 있는 기기를 삭제합니다.
 * @permission 기기 소유자만 접근할 수 있습니다.
 */
router.delete('/:deviceId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 등록되어 있는 기기의 정보를 수정합니다.
 * @permission 기기 소유자만 접근할 수 있습니다.
 */
router.put('/:deviceId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

export default router
