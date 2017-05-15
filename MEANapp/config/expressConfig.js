/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de express                                           */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 7/5/17																				  */
/******************************************************************************************************/
'use strict'
var express = require('express');                           //Cargamos el modulo Express
var app = express();                                        //Inicializamos Express y creamos el objeto App
app.express = express;                                      //Adjuntamos la instancia de Express al objeto de la aplicacion
module.exports = app;                                       //Exportamos la aplicacion
app.set('view engine', 'pug');                              //Indicamos el motor de plantillas
app.set('views', __dirname + '/../views');                  //Indicamos el directorio de las plantillas
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/