/******************************************************************************************************/
/*      Modulo de control del /authenticator                                                          */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 22/5/2017																			  */
/******************************************************************************************************/
'use strict'
const db = require('./../models/models.js')('userModel.js');
const path = require('path');                                   //Modulo de manejo de rutas
const debug = require('debug')('authMain');                 	//Modulo de mensajes de debug
const jwt = require('jsonwebtoken');                            //Requerimos el modulo jwt para verificar el token
module.exports = function (req, res, next) {                    //Funcion exportada
    if (req.body.token) {
        jwt.verify(req.body.token, 'my_secret', (_err, _decoded) => {   //Verificamos el token que se manda al lanzar la app angular
            if (_err) {                                                 //Si hay un error en la verificacion
                debug(_err.message);                                    //Mostramos mensaje de debug
                res.json({                                              //Enviamos respuesta a angular con el error
                    userName: 'N/A',
                    authResult: 'AUTH_ERROR',
                    authError: _err.message
                });
            }
            else if (_decoded && req.session.userName == _decoded.userName) {   //Si el usuario del JWT y el de la sesion coinciden
                debug('Authentication successful! %s', _decoded.userName);      //Mostramos mensaje de exito
                res.json({                                                      //Enviamos a angular respuesta positiva de la autenticacion
                    userName: _decoded.userName,
                    authResult: 'AUTH_OK',
                    authError: 'N/A'
                });
            }
            else {                                                                          //Si la sesion ha expirado o el token no es valido
                debug('Authentication failed! [%s] session expired', _decoded.userName);    //Mostramos mensaje de error
                res.json({                                                                  //Enviamos respuesta a angular con el error
                    userName: _decoded.userName,
                    authResult: 'AUTH_ERROR',
                    authError: 'Session expired!'
                });
            }
        });
    } else if (req.body.randomString) {


    }
}
/******************************************************************************************************/
/*      Requerido por /routes/indexRoute.js                                                           */
/******************************************************************************************************/