/******************************************************************************************************/
/*      Modulo de control del /userProfileMain                                                        */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 30/6/2017																			  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');	//Modelo de datos
const uploads = require('../config/expressConfig.js').uploads;          //Modulo de configuracion de Express, instancia de multer
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('userProfileMain');              //Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
    
	console.log(req.body);
	res.send({result:'OK'});
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/