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
    console.log("Hola!");
    console.log(db);
    db.isUser(req.body.userName, (_err, _user) => {
        if (_user) console.log(_user);
        if (_err) console.log(_err);
    });
    /*if(db.getUserPwdHash(req.body.user) == hash(req.body.pwd)){
        debug('Login successful!');
        req.session = req.body.user;
        res.json({user:'LOGIN_OK', pwd:''});
    }*/

    res.json({ userName: req.body.userName, userPwd: req.body.userPwd, loginResult:'LOGIN_ERROR' });

    console.log(req.body);
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/