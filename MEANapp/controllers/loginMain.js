/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('loginMain');                    //Modulo de mensajes de debug
const hash = require('sha.js');									//Modulo de hasheo 
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {                    //Funcion exportada
    let loginResponse = {
        userName: req.body.userName,
        rememberFlag: req.body.rememberFlag,
        loginResult: 'N/A',
        loginError: 'N/A',
        token: {}
    };
    db.isUser(req.body.userName, (_err, _user) => {
        if (_user) {
            if (_user.userPwd == hash('sha256').update(req.body.userPwd).digest('hex')) {
                req.session.userName = req.body.userName;
                let token = jwt.sign({
                    userName: req.session.userName,
                    userRole: '',
                    iss: 'MEANapp',
                    sub: 'Authentication'
                }, 'my_secret', { expiresIn: req.body.rememberFlag? '30d' : '24h' });
				loginResponse.token = token;
				loginResponse.loginResult = 'LOGIN_OK';
                if (req.body.rememberFlag) {
					req.session.cookie.expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
					res.json(loginResponse);
				}
                else {
					req.session.cookie.expires = false;
					res.json(loginResponse);
				}
            }
            else {
                loginResponse.loginResult = 'LOGIN_FAIL';
                loginResponse.loginError = 'Incorrect password or username';
                res.json(loginResponse);
            }
        }
        else {
            loginResponse.loginResult = 'LOGIN_FAIL';
            loginResponse.loginError = 'Incorrect password or username';
            res.json(loginResponse);
        }
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/