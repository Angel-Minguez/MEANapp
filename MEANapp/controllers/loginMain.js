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
            if (_user.userPwd == hash('sha256').update(req.body.userPwd).digest('hex')) {
                req.session.userName = req.body.userName;
                let token = jwt.sign({userName:req.session.userName, 
									 userRole:'', 
									 iss: 'MEANapp',
									 sub: 'Authentication'
									}, 'my_secret', {expiresIn:'2h'});
				res.json({ userName: req.body.userName, 
						   userPwd: 'N/A', 
						   loginResult: 'LOGIN_OK',
						   token: token});
            }
            else res.json({
                    userName: req.body.userName,
                    userPwd: 'N/A',
                    loginResult: 'LOGIN_FAIL',
                    loginError: 'Incorrect password.',
                    token: {}
            });
        }
        if (_err) {
			debug(_err);
            res.json({
                userName: req.body.userName,
                userPwd: 'N/A ',
                loginResult: 'LOGIN_ERROR',
                loginError: _err,
                token: {}
            });
		}
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/