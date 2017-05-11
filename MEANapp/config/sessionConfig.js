/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de session-express                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 10/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('sessionConfig');            //Modulo de mensajes de debug
const session = require('express-session');                 //Modulo de gestion de sesiones
const Emitter = require('./mongoConfig.js');           
const mongoSession = require('connect-mongo')(session);				//Modulo que genera un almacenamiento en mongodb para las sesiones
const app = require('./expressConfig.js');                  //Modulo de configuracion de Express
//Determinamos que store utilizar              
var sessionPromise = new Promise((resolve, reject)=> {
	if(process.env.SESSION == 'memory'){ 
		var devStore = new session.MemoryStore();               	//Creamos la instancia de MemoryStore
		if (devStore){ 
			debug('MemoryStore created');             	//Informamos de su creacion
			resolve('SESSION_OK');
		}
		else {
			debug('ERROR: Cannot create MemoryStore');         	//Emitimos un error en caso de que haya fallado la creacion
			reject('SESSION_ERROR');
		}
	}
	else {															//En modo produccion o con SESSION = DB usamos mongoDB
		Emitter.eventEmitter.once('MONGO_RDY',()=>{
		console.log('Hola');
		const mongodb = require('./mongoConfig.js').db;				//Modulo de configuracion y conexion a mongoDB
		//const mongodb = Emitter.db;
		//console.log(mongodb);
		//mongodb.once('connected',() => {							//Cuando la conexion este lista
		//	console.log('hola');
			//mongoSession(session);
			var mongoStore = new mongoSession({mongooseConnection:mongodb});//Creamos el store usando la conexion de sesiones de mongoose
			console.log(mongoStore);
			resolve('SESSION_OK');
		//});
		});
	}
});
sessionPromise.then((result)=>{
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
    secret: 	'tabaltas',                                 //Cadena aleatoria para generar los UIDs
    store: process.env.SESSION == 'memory'? devStore : mongoStore,   //Instancia que guarda la informacion de las sesiones
	unset: 		'destroy'	                                //Destruye la sesion cuando la request termina
	}
	console.log(mongoStore);
	app.use(session(sessionOptions));
	debug("Session options loaded: Express-Session active.")
},
(err)=> debug('Error creando sesion %s', err.message));
//Objeto que almacena las opciones de la sesion

/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/