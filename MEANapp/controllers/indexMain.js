/******************************************************************************************************/
/*      Modulo de control del /index                                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('indexMain');                    //Modulo de mensajes de debug
module.exports = function (req, res, next) {                    //Funcion exportada
    //Una peticion a '/' devolvera index.html, que invocara el resto de archivos de la aplicacion angular 
    res.sendFile(path.join(__dirname, '../angular/index.html'), (err) => {
        if (err) debug('ERROR sending /angular/index.html: %s', err.message);   //Capturamos el error en caso de haberlo
    });
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/