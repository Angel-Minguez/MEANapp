/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de mongoose y mongodb                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 11/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('mongoConfig');				//Cargamos el modulo de mensajes de debug
const mongoose = require('mongoose');						//Modulo de control de MongoDB
var events = require('events');
var eventEmitter = new events.EventEmitter();
module.exports.eventEmitter = eventEmitter;
//Conexion a MongoDB
let dbOptions = {server:{socketOptions:{keepAlive:120}}};					//Opciones de la db, timeout para conexiones TCP
mongoose.connect(process.env.DB_CONNECT, dbOptions).then(					//Usamos la variable de entorno que contiene la cadena de conexion
	() => {
		debug('Connection to MongoDB/MEANapp successful');				//Mensaje de exito
		
		module.exports.db = mongoose.connection;
		eventEmitter.emit('MONGO_RDY');

	},
	(err) => {
		debug('ERROR: While connecting to database %s', err.message);
	});	//Si existe un error, se informa				
var db = mongoose.connection;												
db.once('open', () => debug('MongoDB/Meanapp found on:'));	//Añadimos manejador para el evento Open
db.on('error', () => debug('DATABASE ERROR: %s', err.message));							//Añadimos manejador para el evento Error

/******************************************************************************************************/
/*      Requerido por /config/sessionConfig.js                                                        */
/******************************************************************************************************/

