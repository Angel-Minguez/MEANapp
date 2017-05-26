/******************************************************************************************************/
/*      Modulo de configuracion de CORS                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 25/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('corsConfig');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Set-Cookie, Cookie, withCredentials');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        debug('Developement mode: CORS Enabled!');
        next();
    });
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/