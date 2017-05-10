/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de session-express                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 10/5/17																				  */
/******************************************************************************************************/
'use strict'
const session = require('express-session');
const mongodb = require('mongodb').Db;
const app = require('./expressConfig.js');
var sessionOptions = {
	cookie: {
		domain: 	'localhost',
		httpOnly: 	'true',
		maxAge:		1000*60*15, //15 minutes
		path:		'/',
		sameSite:	'strict',
		secure: 	process.env.NODE_ENV == 'developement'? false : true,
	},
	name:		'session.sid',
	proxy:		'undefined',
	resave:		'false',
	rolling:	'true',
	saveUninitialized: 'false',
	secret:		'tabaltas',
	store:		process.env.SESSION == 'memory'? new MemoryStore() : 'mongoDB',
	unset: 		'destroy'	
}
app.use(session(sessionOptions));
	

/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/