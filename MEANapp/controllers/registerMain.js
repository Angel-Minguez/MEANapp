/******************************************************************************************************/
/*      Modulo de control del /register                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
//El frontend envia un objeto JSON con el formato 
//	user: string,
//	pwd: string
const db = require('./../models/models.js')('userModel.js');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('registerMain');                 //Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
    let userInfo = {
        userName: req.body.userName,
        userPwd: req.body.userPwd,
        userEmail: req.body.userEmail
    };
    db.createUser(userInfo, (_err, _user) =>{
        let response = {
            userName: req.body.userName,
            userNameExists: false,
            userPwd: 'N/A',
            userEmail: req.body.userEmail,
            userEmailExists: false,
            registerResult: 'N/A',
            registerError: 'N/A'
        };
        db.isUser(userInfo.userName, (err, user) => {
            if (user) response.userNameExists = true;
            db.isEmail(userInfo.userEmail, (err, email) => {
                if (email) response.userEmailExists = true;
                if (_err) { 
                    response.registerResult = 'REGISTER_ERROR';
                    response.registerError = _err;
                    res.json(response);
                }
                else {
                    response.registerResult = 'REGISTER_OK';
                    res.json(response);
                }
            });
        });               
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/