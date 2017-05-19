/******************************************************************************************************/
/*      Modulo carga de los modelos tras la conexion                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
//Este modulo invoca los constructores de las clases modelo de datos, el modulo es requerido en el callback que
//sigue a la conexion a la base de datos para asegurarnos que nada se ejecuta sin que los modelos esten creados
'use strict'
module.exports = function loadModels(connection) {  //Funcion de carga de los modelos
    var user = require('./userModel.js');           //Requerimos el objeto modelo de usuario
    var obj = new user(connection);                 //
}

