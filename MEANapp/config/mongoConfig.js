/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de mongoose y mongodb                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 11/5/17												          						  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('mongoConfig');			//Cargamos el modulo de mensajes de debug
const mongoose = require('mongoose');					//Modulo de control de MongoDB
//Conexion a MongoDB:
//Al ser un proceso asincrono la funcion utiliza un callback que lanza cuando
//la conexion a mongoDB este lista
class dbLoader {
    constructor() {}
    connect(dbName, callback) {
        if (dbName == 'MEANapp-session') var mongoDB = process.env.DB_SESSION_CONNECT_URL;	//Cargamos la cadena de conexion 
        if (dbName == 'MEANapp') var mongoDB = process.env.DB_CONNECT_URL;			        //Cargamos la cadena de conexion 
        var dbOptions = { server: { socketOptions: { keepAlive: 120 } } };	//Opciones de la db, timeout para conexiones TCP	
        var dbConnectPromise = new Promise((resolve, reject) => {			//Utilizamos una promesa para gestionar las conexiones		
            var connection = mongoose.createConnection(mongoDB, dbOptions);	//Almacenamos la conexion
            if (connection) resolve(connection);	                        //Si la conexion ha sido establecida resolvemos
            else reject(error);												//Si se ha producido un error, rechazamos
        });
        dbConnectPromise.then(												//Resolucion de la promesa
            (connection) => {                                               //Promesa exitosa
                connection.once('open', () => {                             //Añadimos manejador para el evento Open
                    if (callback) callback(connection);                     //Invocamos al callback, la conexion ya esta lista
                    debug('MongoDB/%s database ready', dbName);             //Mensaje de base de datos lista     
                });
                connection.on('error', (err) => debug('[%s] ERROR: %s', dbName, err.message));	//Añadimos manejador para el evento Error
                if (dbName == 'MEANapp-session') {								                //Base de datos de sesiones
                    debug('Connection to MongoDB/MEANapp-session successful');	                //Mensaje de inicio de conexion
                }
                if (dbName == 'MEANapp') {                                                      //Base de datos
                    debug('Connection to MongoDB/MEANapp successful');			                //Mensaje de inicio de conexion
                }
            },
            (err) => {                                                                          //En caso de reject
                debug('ERROR: While creating connection to database %s', err);       	        //Si existe un error, se informa	
            });
    }
}
module.exports = new dbLoader();
/******************************************************************************************************/
/*      Requerido por /config/sessionConfig.js, /models/userModel.js                                  */
/******************************************************************************************************/
