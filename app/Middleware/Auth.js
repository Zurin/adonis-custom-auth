'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const fs = require('fs')
const jwt = require('jsonwebtoken');
const CustomException = use('App/Exceptions/CustomException')
const User = use("App/Models/User");

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    try {
      const apiToken = ctx.auth.getAuthHeader()
      var cert = fs.readFileSync('./cert/jwtRS256.key.pub');  // get public key

      jwt.verify(apiToken, cert, function (err, decoded) {
        if (err) {
          if (err.name === "TokenExpiredError")
            throw new CustomException("Token expired", "E_INVALID_AUTHORIZE", "E_INVALID_AUTHORIZE")
          else
            throw new CustomException(err.message, "E_INVALID_AUTHORIZE", "E_INVALID_AUTHORIZE")
        } else {
          ctx.user = decoded.data
        }
      });

      await next()
    } catch (error) {
      return ctx.response.status(401).json({
        code: 401,
        message: error.message
      })
    }
  }

  async decode(token){
    var cert = fs.readFileSync('./cert/jwtRS256.key.pub');  // get public key
    var rawToken = token.split(" ");
    if (rawToken[0].toLowerCase() != "bearer") {
      data = {
        "message" : "Invalid Token"
      }
    }
    var data
    jwt.verify(rawToken[1], cert, function(err, decoded) {
      if (err) {
        data = {
          "message" : err.message
        }
      } else {
        data = decoded.data
      }      
    });
    return data
  }
}

module.exports = Auth
