/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 20/5/2017																			  */
/******************************************************************************************************/
'use strict'
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('indexMain');                    //Modulo de mensajes de debug
//Una peticion a '/' devolvera index.html, que invocara el resto de archivos de la aplicacion angular
//Puesto que dentro de la carpeta publica que servimos con express.static existe un index.html
//por defecto se muestra index.html y no se utiliza este modulo
module.exports = function (req, res, next) {                    //Funcion exportada
    res.render('index.pug', {});
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/