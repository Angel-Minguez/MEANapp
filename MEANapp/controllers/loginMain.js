/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
//El frontend envia un objeto JSON con el formato 
//	user: string,
//	pwd: string
const db = require('./../models/userModel');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('loginMain');                    //Modulo de mensajes de debug
const hash = require('sha.js');									//Modulo de hasheo 
module.exports = function (req, res, next) {                    //Funcion exportada
	if (db.getUser(req.body.user)){
		if(db.getUserPwdHash(req.body.user) == hash(req.body.pwd)){
			debug('Login successful!');
			req.session = req.body.user;
			res.json({user:'LOGIN_OK', pwd:''});
		}
	}
	else res.json({user:'LOGIN_ERROR', pwd:''})
	
	console.log(req.body);
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/