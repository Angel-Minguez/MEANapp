﻿/******************************************************************************************************/
/*      Modulo de control del /authenticator                                                          */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('authMain');                 	//Modulo de mensajes de debug
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {                    //Funcion exportada
	jwt.verify(req.body.token, 'my_secret',(_err, _decoded)=>{
		if(_err) {
			debug (_err.message);
			res.json({
				userName:'N/A',
				authResult:'AUTH_FAIL',
				authError: _err.message
			});
		}
		else if(_decoded){
			debug ('Authentication successful! %s', _decoded.userName);
			res.json({
				userName:_decoded.userName,
				authResult:'AUTH_OK',
				authError: 'N/A'});
		}
	});
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/