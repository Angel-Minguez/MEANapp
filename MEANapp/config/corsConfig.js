/******************************************************************************************************/
/*      Modulo de configuracion de CORS                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 25/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('corsConfig');
module.exports = function (app) {
    debug('Developement mode: CORS Enabled!');
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        debug('Developement mode: CORS Enabled!');
        next();
    });
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/