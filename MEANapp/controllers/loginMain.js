/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
//El frontend envia un objeto JSON con el formato 
//	user: string,
//	pwd: string
const db = require('./../models/models.js')('userModel.js');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('loginMain');                    //Modulo de mensajes de debug
const hash = require('sha.js');									//Modulo de hasheo 
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {                    //Funcion exportada
    db.isUser(req.body.userName, (_err, _user) => {
        if (_user) {
            if (hash(_user.userPwd) == req.body.userPwd) {
                req.session.user = req.body.userName;
                let token= jwt.sign({userName:req.session.user, 
									 userRole:'', 
									 iss: 'MEANapp',
									 sub: 'Authentication'
									}, 'my_secret', {expiresIn:'2h'});
				
				res.json({ userName: req.body.userName, 
						   userPwd: 'N/A ', 
						   loginResult: 'LOGIN_OK',
						   token: token});
            }
        }
        if (_err) {
			debug(_err);
			res.json({ userName: req.body.userName, userPwd: 'N/A ', loginResult: 'LOGIN_ERROR' });
		}
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/