/******************************************************************************************************/
/*      Modulo carga de los modelos tras la conexion                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 19/5/2017                                                                              */
/******************************************************************************************************/
//Este modulo invoca los constructores de las clases modelo de datos, el modulo es requerido en el callback que
//sigue a la conexion a la base de datos para asegurarnos que nada se ejecuta sin que los modelos esten creados
'use strict'
const fs = require('fs');
var instances = new Map();
module.exports = function loadModels(modelFile, connection) {   //Funcion de carga de los modelos
    if (modelFile == '*') {
        fs.readdir('./models', (err, files) => {
            let parsedFiles = files.filter((fileName) => {
                return /.{1,100}(Model.js)/.test(fileName);
            });
            parsedFiles.forEach((file) => {
                let modelClass = require('./'+file);
                instances.set(file, new modelClass(connection));
            });
        });
    }
    else return instances.get(modelFile); 
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/
