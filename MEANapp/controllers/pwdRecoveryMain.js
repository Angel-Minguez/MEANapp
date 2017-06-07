/******************************************************************************************************/
/*      Modulo de control de /pwdRecovery                                                             */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 6/6/2017																			      */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');	//Modelo de datos del usuario
const nodeMail = require('nodemailer');                         //Modulo de envio de e-mails
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
                let mailOptions = {
                    from: 'apserecovery@gmail.com', 
                    to: req.body.userEmail, 
                    subject: 'APSE Password recovery', 
                    text: 'http://127.0.0.1:4200/main/(landingOutlet:recovery)'
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
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/