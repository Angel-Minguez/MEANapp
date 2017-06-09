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
	if (req.body.userPwd) db.isUser(req.body.userName, (_err, _user) =>{
		if(_err) {
			newPwdResponse.newPwdResult='NEW_PASSWORD_FAIL';
			newPwdResponse.newPwdError = _err.message;
			res.json(newPwdResponse);
		}
		else if (!_user) {
			newPwdResponse.newPwdResult='NEW_PASSWORD_FAIL';
			newPwdResponse.newPwdError = 'User not found!';
			res.json(newPwdResponse);
		} else if(_user) {
			let hashedPwd = hash('sha256').update(req.body.userPwd).digest('hex'); 
			_user.userPwd = hashedPwd;
			_user.save((_saveErr )=>{
				if (_saveErr) {
					newPwdResponse.newPwdResult='NEW_PASSWORD_FAIL';
					debug(_saveErr.errors['userPwd'].message);
					newPwdResponse.newPwdError = _saveErr.errors['userPwd'].message;
					res.json(newPwdResponse);
				}
				else {
					newPwdResponse.newPwdResult='NEW_PASSWORD_OK';
					res.json(newPwdResponse);
				}
			});
		}
	});
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/