/******************************************************************************************************/
/*      Modulo de control de /pwdRecovery                                                             */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 6/6/2017																			      */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');	
const debug = require('debug')('pwdRecoveryMain');             	//Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
    let response = {
		userEmail : req.body.userEmail,
		recoveryResult : 'N/A',
		recoveryError : 'N/A'
	}
	if(req.body.userEmail){
		db.isEmail(req.body.userEmail, (_err, _user) => {
			if (!_user){
				response.recoveryResult = 'RECOVERY_FAIL';
				response.recoveryError = 'E-mail not registered';
				res.json(response);
			}
			else if(_user){
				response.recoveryResult = 'RECOVERY_OK';
				res.json(response);
			}
		});
	}
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/