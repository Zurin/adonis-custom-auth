'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Member extends Model {
    static get table () {
        return 'member'
    }

    static get primaryKey () {
        return 'id_member'
    }
}

module.exports = Member
