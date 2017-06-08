#!/usr/bin/env node
/******************************************************************************************************/
/*      Script de arranque e inicializacion de variables de entorno                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 7/5/2017                                                                               */
/******************************************************************************************************/
const path = require('path');                                           //Modulo manejador de rutas
const logger = require('./logger.js')(path.join(__dirname + '/../logs/bootLog.txt'), { size: 500, offset: 500 }); //Cargamos el modulo de logeo
//Expresiones regulares de los argumentos
const envRegExp = new RegExp(/^(--env:)(developement|production)$/);	//Entorno
const portRegExp = new RegExp(/^(--port:)([0-9]{2,100}$)/);				//Puerto del servidor
const debugRegExp = new RegExp(/^(--debug:)([a-z]{1,100}|-not_this$)/i);//Modulos con debug habilitado
const sessionRegExp = new RegExp(/^(--session:)(db|memory)$/);			//Almacenamiento de las sesiones
const sesDBConRegExp = new RegExp(/^(--sessionDbConnect:)(.{1,255})$/i);//Almacenamiento de las sesiones
const dbRegExp = new RegExp(/^(--db:)(mongodb|.{1,100})$/);				//Tipo de base de datos
const dbConnectRegExp = new RegExp(/^(--dbConnect:)(.{1,255})$/i);		//Cadena de conexion a la bd
//Funcion de parseo de los argumentos
function parseArgs(argv) {
    //Parametros del package npm, si la aplicacion se lanza con 'npm start', los usamos si no existe
	//argumento apropiado, si el script se lanza con 'node' se usaran los valores de los argumentos o
	//o con los valores por defecto en caso de no haberlos.
	process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';	//Entorno
    process.env.PORT = process.env.npm_package_config_port || 11981;						//Puerto del servidor
    process.env.DEBUG = process.env.npm_package_config_debug || '*';						//Modulos con debug habilitado
    process.env.SESSION = process.env.npm_package_config_session || 'memory';		        //Almacenamiento de las sesiones
	process.env.DB = process.env.npm_package_config_db || 'mongodb';						//Tipo de base de datos
	process.env.DB_CONNECT_URL = process.env.npm_package_config_dbConnect
                  ||'mongodb://db-admin:29127957@localhost:27017/MEANapp';	                //Cadena de conexion a la bd
	process.env.DB_SESSION_CONNECT_URL = process.env.npm_package_config_sessionConnect
                  ||'mongodb://db-admin-session:29127957@localhost:27017/MEANapp-session';  //Cadena de conexion a la bd //db-admin-session
    //Parseo de argumento de la linea de comando
    logger.log("Application launched [%s]", process.argv.shift());  //Mostramos el primer argumento (ruta al ejecutable de node) y lo eliminamos
    logger.log("Application path [%s]", process.argv.shift());      //Mostramos el segundo (comando que lanza el script) y lo eliminamos
    //Si alguno de los elementos del array de argumentos devuelve false, 'every' devuelve false tambien
	return process.argv.every((_arg) => {												
        if (envRegExp.test(_arg)) {									//Entorno
            process.env.NODE_ENV = envRegExp.exec(_arg)[2];
            return true;
        }
        else if (portRegExp.test(_arg)) {							//Puerto
			if (parseInt(portRegExp.exec(_arg)[2]) > 20000 || parseInt(portRegExp.exec(_arg)[2]) < 10000) {
				logger.log("Error: Port out of range, port should be in the range 10000-20000");
                logger.log('Terminating ....');
				return false;
            }
            process.env.PORT = portRegExp.exec(_arg)[2]; 
            return true;
        }
        else if (debugRegExp.test(_arg)) {							//Modulos con mensajes debug
            process.env.DEBUG = debugRegExp.exec(_arg)[2];            
            return true;
        }
        else if (sessionRegExp.test(_arg)) {						//Almacenamiento de las sesiones
			process.env.SESSION = sessionRegExp.exec(_arg)[2];            
            return true;
		}
		else if (sesDBConRegExp.test(_arg)) {						//Almacenamiento de las sesiones
			process.env.DB_SESSION_CONNECT = sesDBConRegExp.exec(_arg)[2];            
            return true;
		}
		else if (dbRegExp.test(_arg)) {								//Tipo de base de datos
			process.env.DB = dbRegExp.exec(_arg)[2];
            return true;
		}
		else if (dbConnectRegExp.test(_arg)) {						//Cadena de conexion a la base de datos
			process.env.DB_CONNECT = dbConnectRegExp.exec(_arg)[2];            
            return true;
		}
		//Si el argumento con concuerda con ninguna expresion regular
		else {
            logger.log('Incorrect arguments please use --h for help.');
            logger.log('Terminating ....');
            return false;
        }
    });
}
//Mostramos resumen de las variables de entorno
if (parseArgs(process.argv)) {
	logger.log("-Environment set: %s", 			process.env.NODE_ENV);
	logger.log("-Port set: %s", 				process.env.PORT);
	logger.log("-Debug set for modules: %s",	process.env.DEBUG);
	logger.log("-Session storage set to: %s", 	process.env.SESSION);
	logger.log("-DB Session connection string: %s", 	process.env.DB_SESSION_CONNECT);
	logger.log("-DB is set to: %s", 			process.env.DB);
	logger.log("-DB Connection string: %s", 	process.env.DB_CONNECT);
	logger.log("Server initializating .....");
	require('../server.js');                    //Lanzamos el modulo principal
}
