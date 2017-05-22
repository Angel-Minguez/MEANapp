/******************************************************************************************************/
/*      Modulo de definicion de la clase User                                                         */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 15/5/2017                                                                              */
/******************************************************************************************************/
'use strict'
var mongoose = require('mongoose');
module.exports = class user {
    constructor(connection) {
        var Schema = mongoose.Schema({
            userName:   String,
            userPwd: String,
            userEmail: String,
            userCreationTime: Date,
            userLastLoginTime: Date,
            userRole: String,
            userGroup: String

        });
        var model1 = connection.model('User', Schema);
        console.log(model1);
    }
    static say() {
        console.log('Hola')
    };
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/