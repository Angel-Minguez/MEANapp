/******************************************************************************************************/
/*      Modulo de control de /pwdRecovery                                                             */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 6/6/2017																			      */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');	//Modelo de datos del usuario
const nodeMail = require('nodemailer');                         //Modulo de envio de e-mails
const randString = require('randomstring');						//Modulo para generar cadenas aleatorias
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
                var smtpConfig = {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'apserecovery@gmail.com',
                        pass: '3071981zgz'
                    }
                };
                let userPwdRecoveryUrl = randString.generate(100);
				let recoveryUrl = 'http://127.0.0.1:4200/main/(landingOutlet:recovery/'+ _user.userName +'/'+ userPwdRecoveryUrl +')';
				db.userModel.update({userName: _user.userName}, {userPwdRecoveryUrl: userPwdRecoveryUrl}, (_err, _update) => {
					if(_err){
						debug('Error updating user: [%s]', _user.userName);
						response.recoveryResult = 'RECOVERY_FAIL';
						response.recoveryError = 'Error accessing user data, please try again later';
						res.json(response);
					} else if(_update) {
						console.log(_update);
						let mailOptions = {
							from: 'apserecovery@gmail.com', 
							to: req.body.userEmail, 
							subject: 'APSE Password recovery', 
							text: recoveryUrl
						};
						let transport = nodeMail.createTransport(smtpConfig);
						transport.sendMail(mailOptions,  (_err, _info) => {
							if (_err) {
								debug(_err);
								response.recoveryResult = 'RECOVERY_FAIL';
								response.recoveryError = 'Error sending mail, please try again later.';
							} else debug('Message sent: ' + _info.response);
						});
						res.json(response);
					}
				});
			}
		});
	}
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/