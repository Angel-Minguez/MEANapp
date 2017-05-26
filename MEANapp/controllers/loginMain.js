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
module.exports = function (req, res, next) {                    //Funcion exportada
    db.isUser(req.body.userName, (_err, _user) => {
        if (_user) {
            if (hash(_user.userPwd) == req.body.userPwd) {
                req.session.user = req.body.userName;
                res.json({ userName: req.body.userName, userPwd: 'N/A ', loginResult: 'LOGIN_OK' });
            }

        }
        if (_err) console.log(_err);
    });
   

    

    console.log(req.body);
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/