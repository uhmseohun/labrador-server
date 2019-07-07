import jwt from 'jsonwebtoken'

/**
 * @summary 사용자의 토큰을 받아 정보를 반환합니다.
 * @param {String} 사용자의 토큰
 */
export default token => {
  try {
    return jwt.verify(token, process.env.JWTSECRETKEY)
  } catch (error) {
    return {}
  }
}
