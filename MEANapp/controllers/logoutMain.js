/******************************************************************************************************/
/*      Modulo de control del /logout                                                                 */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 29/5/2017																			  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('logoutMain');
module.exports = function (req, res, next) {
    req.session.destroy((_err) => {
        if (_err) {
            res.json({
                userName: req.body.userName,
                LogoutResult: 'LOGOUT_FAIL',
                LogoutError: _err.message
            });
        }
        else {
            debug('Session destroyed for: [%s]', req.body.userName);
            res.json({
                userName: req.body.userName,
                LogoutResult: 'LOGOUT_OK',
                LogoutError: 'N/A'
            });
        }
    });   
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/
