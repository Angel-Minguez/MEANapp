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
const hash = require('sha.js');									//Modulo de hasheo 
module.exports = function (req, res, next) {                    //Funcion exportada
    let userInfo = {
        userName: req.body.userName,
        userPwd: 'N/A',
        userEmail: req.body.userEmail
    };
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.{8,})/.test(req.body.userPwd)) {
        userInfo.userPwd = hash('sha256').update(req.body.userPwd).digest('hex');
    }
    else {
        res.json({
            userName: req.body.userName,
            userPwd: 'N/A',
            userEmail: req.body.userEmail,
            registerResult: 'REGISTER_ERROR',
            registerError: 'Invalid password, it has to be 8 characters long and include at least one digit.'
        });
        return;
    }
    db.createUser(userInfo, (_err, _user) =>{
        if (_err) res.json({
            userName: req.body.userName,
            userPwd: 'N/A',
            userEmail: req.body.userEmail,
            registerResult: 'REGISTER_ERROR',
            registerError: _err
        });
        else res.json({
            userName: req.body.userName,
            userPwd: 'N/A',
            userEmail: req.body.userEmail,
            registerResult: 'REGISTER_OK',
            registerError: 'N/A'
        });
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/