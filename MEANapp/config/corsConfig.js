/******************************************************************************************************/
/*      Modulo de configuracion de CORS                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 25/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('corsConfig');
module.exports = function (app) {
    app.use(function (req, res, next) {                                 //Funcion middleware que habilita los Headers para que funcione CORS
        res.header('Access-Control-Allow-Credentials', true);           //Permite el paso de cookies a traves de CORS
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');     //Permite a la aplicacion angular en entorno de desarrollo acceder al servidor
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Set-Cookie, Cookie, withCredentials');    //Headers permitidos en la comunicacion
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');                            //Verbos permitidos
        debug('Developement mode: CORS Enabled!');                                                                  //Mensaje de debug
        if (req.method == 'OPTIONS') res.sendStatus(200);                                                           //Puenteamos el verbo OPTIONS
        else next();                                                                                                //Invocamos al siguiente middleware
    });
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/