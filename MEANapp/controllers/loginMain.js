/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
//El frontend envia un objeto JSON con el formato 
//	userName: string,
//	userPwd: string,
//  loginResult: string,
//  loginError: string
const db = require('./../models/userModel');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('loginMain');                    //Modulo de mensajes de debug
const hash = require('sha.js');									//Modulo de hasheo 
module.exports = function (req, res, next) {                    //Funcion exportada
    console.log(req.body);
   /* if (db.getUser(req.body.user)) {
		if(db.getUserPwdHash(req.body.user) == hash(req.body.pwd)){
			debug('Login successful!');
			req.session = req.body.user;
			res.json({user:'LOGIN_OK', pwd:''});
		}
	}
	else res.json({user:'LOGIN_ERROR', pwd:''})*/
    var error = 'error message';
    res.json({ userName: req.body.userName, userPwd:'' , loginResult:'LOGIN_ERROR', loginError: error })
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/