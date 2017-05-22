/******************************************************************************************************/
/*      Modulo de ruteo                                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 7/5/2017                                                                               */
/******************************************************************************************************/
'use strict'
//Funcion que se exporta, recibe el objeto aplicacion como parametro
module.exports = function router(app) {
    function router(req, res, next) {                                       //Funcion middleware de routeo de requests
        app.get('/*', require('../controllers/indexMain.js'));              //Landing page
        app.post('/loginAttempt', (req, res, next) => {
            console.log(req.body);
            res.end("Holaaa!");        });
        next();                                                             //Invocamos el siguiente elemento de la pila de middleware  
    }
    app.use('/', router);                                                   //Añadimos router a la pila de middleware
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/