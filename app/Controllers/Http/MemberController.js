'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Member = use('App/Models/Member');
const CAuth = use('App/Middleware/Auth');

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  /**
   * Show a list of all members.
   * GET members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    let token = request.header('Authorization');
    let cauth = new CAuth();
    let decoded = await cauth.decode(token);

    let member = await Member.query().where('merchant_code', decoded.aino_merchant_id)
                                     .orderBy('id_member', 'desc')
                                     .fetch()
    let resp = {
      "success" : true,
      "data" : member
    }
    return response.json(resp)
  }

  /**
   * Render a form to be used for creating a new member.
   * GET members/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new member.
   * POST members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single member.
   * GET members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing member.
   * GET members/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update member details.
   * PUT or PATCH members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a member with id.
   * DELETE members/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async getToken({token}) {
    let cauth = new CAuth();
    let decoded = await cauth.decode(token);

    return decoded;
  }
}

module.exports = MemberController
