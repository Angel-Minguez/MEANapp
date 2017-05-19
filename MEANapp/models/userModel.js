/******************************************************************************************************/
/*      Modulo carga de los modelos tras la conexion                                    */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
var mongoose = require('mongoose');
//
//db.connect('MEANapp', (connection) => {
    //register models
module.exports = class user {
    constructor(connection) {
        var Schema = mongoose.Schema({ user: String });
        var model1 = connection.model('User', Schema);
        console.log(model1);
    }
    say() {
        console.log('Hola')
    };
}

   
//});





/*require('../config/mongoConfig')('MEANapp',(conn)=>{
	
	//connection.model
});*/
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/