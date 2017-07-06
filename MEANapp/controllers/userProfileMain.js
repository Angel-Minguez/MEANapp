/******************************************************************************************************/
/*      Modulo de control del /userProfileMain                                                        */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 30/6/2017																			  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');	//Modelo de datos 
const path = require('path');                                   //Modulo de manejo de rutas
const fs = require('fs');										//Modulo de manejo de archivos
const debug = require('debug')('userProfileMain');              //Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
	if(req.file){
		console.log(req.file.path);
		fs.rename(path.normalize(req.file.path), `../static/avatars/${req.session.userName}avatarImg`, (_err)=> console.log(_err));
	}
	res.send({result:'OK'});
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/