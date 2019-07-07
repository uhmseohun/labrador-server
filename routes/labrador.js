import { Router } from 'express'

import models from '../models'
import messages from '../utils/messages'

const router = Router()

/**
 * @summary 자신의 래브라도 기기를 모두 반환합니다.
 */
router.get('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 새로운 래브라도 기기를 등록합니다.
 */
router.post('/', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

/**
 * @summary 등록되어 있는 래브라도 기기를 삭제합니다.
 * @permission 래브라도의 소유자만 접근할 수 있습니다.
 */
router.delete('/:labradorId', (req, res, next) => {
  next(models.Error(423, messages.underDev))
})

export default router
