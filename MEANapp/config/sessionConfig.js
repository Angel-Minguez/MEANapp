/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de session-express                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 10/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('sessionConfig');            //Modulo de mensajes de debug
const session = require('express-session');                 //Modulo de gestion de sesiones
const mongodb = require('./mongoConfig.js');                //Modulo de configuracion mongoDB
const app = require('./expressConfig.js');                  //Modulo de configuracion de Express
//Store para modo desarrollo, hospedado en memoria;
if (process.env.NODE_ENV == 'developement') {               //Si estamos en modo desarrollo
    var devStore = new session.MemoryStore();               //Creamos la instancia de MemoryStore
    if (devStore) debug('MemoryStore created');             //Informamos de su creacion
    else debug('ERROR: Cannot create MemoryStore');         //Emitimos un error en caso de que haya fallado la creacion
}
//Objeto que almacena las opciones de la sesion
var sessionOptions = {
	cookie: {                                               //Opciones de cookie
		domain: 	'localhost',                            //Nombre de dominio
		httpOnly: 	'true',                                 //Modo http only
		maxAge:		1000*60*15,                             //Duracion maxima de la cookie: 15 minutos        
		path:		'/',                                    //La cookie sera enviada en cualquier pagina del dominio
		sameSite:	'strict',                                               //Politica de uso de la cookie en otras paginas
		secure: 	process.env.NODE_ENV == 'developement'? false : true,   //En modo desarrollo HTTP, en produccion HTTPS
	},
	name:		'session.sid',                              //Nombre del valor de la cookie
	proxy:		'undefined',                                //Comportamiento frente a proxy inverso
	resave:		'false',                                    //Guardar la informacion en la sesion en cada request, aunque no haya cambios
	rolling:	'true',                                     //La duracion de la sesion se regenera en cada request
	saveUninitialized: 'false',                             //Fuerza a guardar la sesion cuando no esta inicializada
    secret: 'tabaltas',                                     //Cadena aleatoria para generar los UIDs
    store: process.env.SESSION == 'memory'? devStore : 'mongoDB',   //Instancia que guarda la informacion de las sesiones
	unset: 		'destroy'	                                //Destruye la sesion cuando la request termina
}
app.use(session(sessionOptions));
debug("Session options loaded: Express-Session active.");
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/