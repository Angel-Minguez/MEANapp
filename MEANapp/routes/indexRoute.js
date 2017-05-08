﻿/******************************************************************************************************/
/*      Modulo de ruteo de /index                                                                     */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
module.exports = function (app) {
    let indexMain = require('../controllers/indexMain.js');
    app.route('/').get(indexMain);
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/