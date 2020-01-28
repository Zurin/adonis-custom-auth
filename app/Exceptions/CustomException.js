'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

const MSG = new Map([
  // error code postrgresql ==> https://www.postgresql.org/docs/8.2/errcodes-appendix.html
  ['23505', {
    httpStatus: 400,
    code: '23505',
    message: 'data already exists.'
  }],
  ['42P01', {
    httpStatus: 500,
    code: '42P01',
    message: 'Missing table in database.'
  }],
  ['42703', {
    httpStatus: 500,
    code: '42703',
    message: 'Missing column in database.'
  }],
  ['42601', {
    httpStatus: 500,
    code: '42601',
    message: 'An error occurred in the database query.'
  }],
  ['23503', {
    httpStatus: 400,
    code: '23503',
    message: 'data already exists.'
  }],
  ['23502', {
    httpStatus: 400,
    code: '23502',
    message: 'field cannot be empty (database).'
  }],

  // internal message code
  ['MERCHANT_SAVE_SUCCESS', {
    httpStatus: 200,
    code: 'M2001',
    message: 'Congratulations! You are officialy join to AINO Unified Service. You have one more step to complete to be our verified merchant.'
  }],
  ['MERCHANT_CATEGORY_SAVE_SUCCESS', {
    httpStatus: 200,
    code: 'MC2001',
    message: 'merchant category successfully created.'
  }],
  ['SAVE_SUCCESS', {
    httpStatus: 200,
    code: '2001',
    message: 'save successfully.'
  }],
  ['SUCCESS', {
    httpStatus: 200,
    code: '2002',
    message: 'successfully.'
  }],
  ['UPDATE_SUCCESS', {
    httpStatus: 200,
    code: '2003',
    message: 'update successfully.'
  }],
  ['DELETE_SUCCESS', {
    httpStatus: 200,
    code: '2004',
    message: 'deleted successfully.'
  }],
  ['NOT_FOUND', {
    httpStatus: 404,
    code: 'N4004',
    message: null
  }],
  ['USER_IS_INACTIVE', {
    httpStatus: 400,
    code: 'U4001',
    message: 'Sorry, your account is inactive. Please contact Admin for further information.'
  }],
  ['USER_NOT_REGISTER', {
    httpStatus: 400,
    code: 'U4000',
    message: 'Your email is not registered.'
  }], ['LOGIN_FAILED', {
    httpStatus: 400,
    code: 'L4000',
    message: 'Invalid username or password.'
  }],
  ['PASSWORD_NOT_MATCH', {
    httpStatus: 400,
    code: 'P4000',
    message: 'password does not match.'
  }],
  ['ERROR_VALIDATION', {
    httpStatus: 400,
    code: 'V4000',
    message: null
  }],
  ['ERROR_VALIDATION_DEVICE_REQUEST', {
    httpStatus: 400,
    code: 'V4000',
    message: 'the number of excel rows exceeds the number of devices requested.'
  }],
  ['EXCEL_PARSE_ERROR', {
    httpStatus: 400,
    code: '400',
    message: null
  }], ['EXCEL_MOVE_ERROR', {
    httpStatus: 400,
    code: '400',
    message: null
  }],
  ['E_INVALID_AUTHORIZE', {
    httpStatus: 401,
    code: '401',
    message: null
  }],
  ['EMAIL_ALREADY_USED', {
    httpStatus: 400,
    code: '400',
    message: 'Email is already registered by another account'
  }],
  ['STATUS_INVALID_PENDING', {
    httpStatus: 400,
    code: '400',
    message: 'status device request is pending'
  }],
  ['STATUS_INVALID_CANCEL', {
    httpStatus: 400,
    code: '400',
    message: 'status device request is cancel'
  }],
])

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  static getMessage(message_code) {
    const msg = MSG.get(message_code)
    return msg.message
  }

  static getResponse({message_code, response, data}) {
    const msg = MSG.get(message_code)
    if (msg !== undefined) {
      return response
        .status(msg.httpStatus)
        .json({
          code: msg.httpStatus,
          message_code: msg.code,
          message: msg.message,
          data: data
        })
    } else {
      return response
        .status(500)
        .json({
          code: 500,
          message: 'error mapping http response (message code not found)',
          data: data
        })
    }
  }

  static getErrorResponse(error, response) {
    console.log(error)
    const msg = MSG.get(error.code)
    if (msg !== undefined) {
      if (msg.message !== null)
        return response
          .status(msg.httpStatus)
          .json({
            code: msg.httpStatus,
            message_code: msg.code,
            message: msg.message
          })
      else
        return response
          .status(msg.httpStatus)
          .json({
            code: msg.httpStatus,
            message_code: msg.code,
            message: error.message
          })
    } else {
      return response
        .status(500)
        .json({
          code: 500,
          message_code: error.code,
          message: error.message
        })
    }
  }
}

module.exports = CustomException