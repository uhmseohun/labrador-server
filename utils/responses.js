import messages from './messages'

export default {
  apiNotExist: {
    code: 404,
    message: messages.apiNotExist
  },
  userNotExist: {
    code: 404,
    message: messages.userNotExist
  },
  labradorNotExist: {
    code: 404,
    message: messages.labradorNotExist
  },
  deviceNotExist: {
    code: 404,
    message: messages.deviceNotExist
  },
  placeNotExist: {
    code: 404,
    message: messages.placeNotExist
  },
  checkPayload: {
    code: 400,
    message: messages.checkPayload
  },
  checkAccount: {
    code: 404,
    message: messages.checkAccount
  },
  failAuth: {
    code: 401,
    message: messages.failAuth
  },
  noPermission: {
    code: 403,
    message: messages.noPermission
  },
  underDev: {
    code: 423,
    message: messages.underDev
  },
  success: {
    code: 200,
    message: messages.success
  },
  duplicatedId: {
    code: 409,
    message: messages.duplicatedId
  },
  unknownError: {
    code: 500,
    message: messages.unknownError
  },
  notiNotExist: {
    code: 404,
    message: messages.notiNotExist
  }
}
