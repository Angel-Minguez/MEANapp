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
module.exports = function (dbName, callback) {        	//El callback como argumento se ejecutara cuado la consexion este establecida
	if(dbName == 'MEANapp-session') var mongoDB = process.env.DB_SESSION_CONNECT;	//Cargamos la cadena de conexion 
	if(dbName == 'MEANapp') var mongoDB = process.env.DB_CONNECT;					//Cargamos la cadena de conexion 
	var dbOptions = { server: { socketOptions: { keepAlive: 120 }}};	//Opciones de la db, timeout para conexiones TCP	
	var dbConnectPromise = new Promise((resolve, reject) => {			//Utilizamos una promesa para gestionar las conexiones		
		var connection = mongoose.createConnection(mongoDB, dbOptions);	//Almacenamos la conexion
		if(connection) resolve();										//Si la conexion ha sido establecida resolvemos
		else reject();													//Si se ha producido un error, rechazamos
	});					
	dbConnectPromise.then(													//Resolucion de la promesa
		() => {                                                         	//Promesa exitosa
			if(dbName == 'MEANapp-session') {								//Base de datos de sesiones
				debug('Connection to MongoDB/MEANapp-session successful');	//Mensaje de exito
				callback(mongoose.connection);                              //Invocamos al callback, la conexion ya esta lista
			}
			if(dbName == 'MEANapp') {
				debug('Connection to MongoDB/MEANapp successful');			//Mensaje de exito
				callback(mongoose.connection);                            //Invocamos al callback, la conexion ya esta lista
			}	
		},
		(err) => {                                                          //En caso de reject
			debug('ERROR: While connecting to database %s', err);       	//Si existe un error, se informa	
		});
    var db = mongoose.connection;
    db.once('open', () => debug('MongoDB/Meanapp found on:'));	            //Añadimos manejador para el evento Open
    db.on('error', () => debug('DATABASE ERROR: %s', err.message));			//Añadimos manejador para el evento Error
}
/******************************************************************************************************/
/*      Requerido por /config/sessionConfig.js, /models/userModel.js                                  */
/******************************************************************************************************/
