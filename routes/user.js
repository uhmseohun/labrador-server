import { Router } from 'express'

import responses from '../utils/responses'

const router = Router()

/**
 * @summary 사용자 자신의 현재 상태를 반환합니다.
 */
router.get('/', (req, res, next) => {
  next(responses.underDev)
})

/**
 * @summary userId 사용자의 현재 상태를 반환합니다.
 * 사용자 자신 또는 사용자의 보호자만 접근할 수 있습니다.
 */
router.get('/:userId', (req, res, next) => {
  next(responses.underDev)
})

export default router
