/******************************************************************************************************/
/*      Modulo de control del /formulario de crear cntraseña nueva                                    */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 9/6/2017													     						  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');
const hash = require('sha.js');									    //Modulo de hasheo 
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('newPwd');                 		//Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
    let newPwdResponse = {
		userName : req.body.userName,
		newPwdResult : 'N/A',
		newPwdError : 'N/A'
	};
    if (req.body.userPwd) {
        db.isUser(req.body.userName, (_err, _user) => {
            if (_err) {
                newPwdResponse.newPwdResult = 'NEW_PASSWORD_FAIL';
                newPwdResponse.newPwdError = _err;
                res.json(newPwdResponse);
            }
            else if (!_user) {
                newPwdResponse.newPwdResult = 'NEW_PASSWORD_FAIL';
                newPwdResponse.newPwdError = 'User not found!';
                res.json(newPwdResponse);
            } else if (_user) {
                if (/^(?=.*[0-9])(?=.*[a-z])(?=.{8,})/.test(req.body.userPwd)) {                //Comprobamos que la pwd sea correcta
                    _user.userPwd = hash('sha256').update(req.body.userPwd).digest('hex');      //En caso de serlo obtenemos un hash y lo guardamos
                }
                else _user.userPwd = 'INVALID_PWD';
                _user.save((_saveErr) => {
                    if (_saveErr) {
                        newPwdResponse.newPwdResult = 'NEW_PASSWORD_FAIL';
                        debug(_saveErr.errors['userPwd'].message);
                        newPwdResponse.newPwdError = _saveErr.errors['userPwd'].message;
                        res.json(newPwdResponse);
                    }
                    else {
                        newPwdResponse.newPwdResult = 'NEW_PASSWORD_OK';
                        res.json(newPwdResponse);
                    }
                });
            }
        });
    } else {
        newPwdResponse.newPwdResult = 'NEW_PASSWORD_FAIL';
        newPwdResponse.newPwdError = 'Please enter a valid password';
        res.json(newPwdResponse);
    }
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/