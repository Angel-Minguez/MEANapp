/******************************************************************************************************/
/*      Modulo de configuracion e inicializacion de session-express                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*		Fecha: 10/5/17																				  */
/******************************************************************************************************/
'use strict'
const debug = require('debug')('sessionConfig');            //Modulo de mensajes de debug
const session = require('express-session');                 //Modulo de gestion de sesiones         
const mongoSession = require('connect-mongo')(session);		//Modulo que genera un almacenamiento en mongodb para las sesiones
const app = require('./expressConfig.js');                  //Modulo de configuracion de Express
var devStore, mongoStore;                                   //Declaramos los dos almacenamiento como globales
//Determinamos que store utilizar
var sessionPromise = new Promise((resolve, reject) => {     //Usamos una promesa que inicializara los stores antes de aplicarlos
    if (process.env.SESSION == 'memory') {                  //Si espacificamos que se usara un store en memoria
        devStore = new session.MemoryStore();               //Creamos la instancia de MemoryStore
        if (devStore) {                                     //Comprobamos que se ha creado correctamente
            debug('MemoryStore created');             	    //Informamos de su creacion
            resolve('SES_STORE_RDY');                       //Resolvemos la promesa
        }
        else {
            debug('ERROR: Cannot create MemoryStore');      //Emitimos un error en caso de que haya fallado la creacion
            reject('SES_STORE_ERROR');                      //Rechazamos la promesa
        }
    }
    else {													                                //Con proces.env.SESSION = DB usamos mongoDB		
        let db = require('./mongoConfig.js').connect('MEANapp-session', (connection) => {   //Requerimos el modulo de mongoDB
            mongoStore = new mongoSession({ mongooseConnection: connection });              //Creamos el store utilizando la conexion de mongoose
            resolve('SES_STORE_RDY');                                                       //Resolvemos la promesa
        });
    }
});
sessionPromise.then(                                                                        //Hasta que el store no este listo no podemos usar las opciones
    (result) => {                                                                           //Resolucion de la promesa
        var sessionOptions = {                                                              //Objeto que contiene las opciones de la sesion
            cookie: {                                                                       //Opciones de cookie
                domain: process.env.NODE_ENV == 'developement' ? '127.0.0.1' : 'domainName',//Nombre de dominio
                httpOnly: 'true',                                                           //Modo http only
                maxAge: 1000 * 60 * 15 * 1000,                                              //Duracion maxima de la cookie: 15 minutos (Valor por defecto, que es sobreescrito por el servidor)
                expires: false,                                                             //La sesion se destruye al salir del navegador (Valor por defecto, que es sobreescrito por el servidor)
                path: '/',                                                                  //La cookie sera enviada en cualquier pagina del dominio
				//sameSite:'Strict',                                                        //Politica de uso de la cookie en otras paginas
                secure: process.env.NODE_ENV == 'developement' ? false : true,              //En modo desarrollo HTTP, en produccion HTTPS
            },
            name: 'MEANapp.suid',                                                           //Nombre del valor de la cookie
            proxy: 'undefined',                                                             //Comportamiento frente a proxy inverso
            resave: false,                                                                  //Guardar la informacion en la sesion en cada request, aunque no haya cambios
            //rolling: 'false',    Aun siendo false, fuerza el envia tras cada request      //La duracion de la sesion se regenera en cada request
            saveUninitialized: false,                                                       //Fuerza a guardar la sesion cuando no esta inicializada
            secret: 'DRVjmaqcVq14dtrNj4ye',                                                 //Cadena aleatoria para generar los UIDs
            store: process.env.SESSION == 'memory' ? devStore : mongoStore,                 //Instancia que guarda la informacion de las sesiones
            unset: 'keep'	                                                                //Destruye la sesion cuando la request termina
        }
        if (result == 'SES_STORE_RDY') {
            app.use(session(sessionOptions));
            debug("Session options loaded: Express-Session active.");           //Informamos de que la sesion esta activa
        }
    },
    (err) => debug('ERROR while creating session: %s', err)); //Si la promesa es rechazada lanzamos mensaje de error
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/