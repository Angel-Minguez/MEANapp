/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de express                                           */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 7/5/17																				  */
/******************************************************************************************************/
'use strict'
var express =require('express');
var app =  express();
module.exports = app;
//let app;
//module.exports = app = require('express')();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../views');
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/