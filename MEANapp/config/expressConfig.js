/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de express                                           */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 7/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('expressConfig');                //Modulo de mensajes de debug
const path = require('path');                                   //Modulo de manejo de rutas
var express = require('express');                               //Cargamos el modulo Express
var app = express();                                            //Inicializamos Express y creamos el objeto App
app.express = express;                                          //Adjuntamos la instancia de Express al objeto de la aplicacion
module.exports = app;                                           //Exportamos la aplicacion
//Motor de plantillas
app.set('view engine', 'pug');                                  //Indicamos el motor de plantillas
app.set('views', __dirname + '/../views');                      //Indicamos el directorio de las plantillas
//Servidor de archivos estaticos
app.use(express.static(path.join(__dirname + './../angular'))); //Carpeta de la aplicacion angular
app.use(express.static(path.join(__dirname + './../static')));  //Carpeta de archivos estaticos
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/