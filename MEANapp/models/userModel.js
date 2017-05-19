/******************************************************************************************************/
/*      Modulo carga de los modelos tras la conexion                                    */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
var mongoose = require('mongoose');
module.exports = class user {
    constructor(connection) {
        var Schema = mongoose.Schema({ user: String });
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