/**
 * @summary 페이로드의 키를 검증합니다.
 */
export default (req, res, keys) => {
  let emptyKeys = keys.filter(v => !req.body.hasOwnProperty(v))
  return emptyKeys.length === 0 &&
    keys.length === Object.keys(req.body).length
}
