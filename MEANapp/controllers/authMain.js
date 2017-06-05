/******************************************************************************************************/
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
    console.log(req.body);
	jwt.verify(req.body.token, 'my_secret', (_err, _decoded) => {
		console.log(_decoded);
		console.log(req.session.userName);
		if(_err) {
			debug (_err.message);
			res.json({
				userName:'N/A',
				authResult:'AUTH_ERROR',
				authError: _err.message
			});
		}
		else if(_decoded && req.session.userName == _decoded.userName){
			debug ('Authentication successful! %s', _decoded.userName);
            console.log(req.session.userName);
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