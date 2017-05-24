/******************************************************************************************************/
/*      Modulo carga de los modelos tras la conexion                                                  */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 19/5/2017                                                                              */
/******************************************************************************************************/
//Este modulo invoca los constructores de las clases modelo de datos, el modulo es requerido en el callback que
//sigue a la conexion a la base de datos para asegurarnos que nada se ejecuta sin que los modelos esten creados
'use strict'
const fs = require('fs');										//Modulo de manejo de archivos
var instances = new Map();										//Creamos el mapa de nombres e instancias
module.exports = function loadModels(modelFile, connection) {   //Funcion de carga de los modelos
    if (modelFile == '*') {										//Si se invoca con el parametro '*'
        fs.readdir('./models', (err, files) => {				//Leemos los archivos del directorio de modelos
            let parsedFiles = files.filter((fileName) => {		//Parseamos los archivos 
                return /.{1,100}(Model.js)/.test(fileName);		//Creamos un array con el nombre de los archivos correctos
            });
            parsedFiles.forEach((file) => {						//Recorremos el array de nombre validos
                let modelClass = require('./'+file);			//Requerimos la clase que genera el modelo
                instances.set(file, new modelClass(connection));//Creamos la instancia del modelo y su clase y la almacenamos en el mapa
            });
        });
    }
    else return instances.get(modelFile); 						//Devolvemos la instancia apropiada del mapa
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/
