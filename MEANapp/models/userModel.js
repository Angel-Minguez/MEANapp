/******************************************************************************************************/
/*      Modulo de definicion del modelo de datos de usu de /index                                     */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
var mongoose=require('mongoose');
console.log(process.env.DB_CONNECTION);
/*require('../config/mongoConfig')('MEANapp',(conn)=>{
	var Schema = new mongoose.Schema({user:String})
	var model1 = conn.model('User', Schema);
	console.log(model1);
	//connection.model
});*/
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/