/******************************************************************************************************/
/*      Script de arranque e inicializacion de variables de entorno                                   */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 7/5/2017                                                                               */
/******************************************************************************************************/
const logger = require('./logger.js')( '../logs/bootLog.txt', { size: 500, offset: 500 });
const envRegExp = new RegExp(/^(--env)(\(developement\)|\(production\))/);
const portRegExp = new RegExp(/^(--port)(\([0-9]{2,5}\))/);
const debugRegExp = new RegExp(/^(--debug)(\([a-z]{1,100}\))/);
function parseArgs(argv) {
    process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';
    process.env.PORT = process.env.npm_package_config_port || 11981;
    process.env.DEBUG = process.env.npm_package_config_debug || '*';
   // db memory
   // connect string
    logger.log("Application launched [%s][%s] ", process.argv.shift(), process.argv.shift());
    return process.argv.every((_arg) => {
        if (envRegExp.test(_arg)) {
            process.env.NODE_ENV = envRegExp.exec(_arg)[2];
            logger.log("Environment set: %s", process.env.NODE_ENV);
            return true;
        }
        else if (portRegExp.test(_arg)) {
            if (parseInt(portRegExp.exec(_arg)[2]) > 20000 || parseInt(portRegExp.exec(_arg)[2]) < 10000) {
                logger.log("Error: Port out of range, port should be in the range 10000-20000");
                return false;
            }
            process.env.PORT = portRegExp.exec(_arg)[2];
            logger.log("Port set: %s", process.env.PORT);
            return true;
        }
        else if (debugRegExp.test(_arg)) {
            process.env.DEBUG = debug.exec(_arg)[2];
            logger.log("Debug set: %s", process.env.DEBUG);
            return true
        }
        else {
            logger.log('Incorrect arguments please use --h for help.');
            logger.log('Terminating ....');
            return false;
        }
    });
}
if (parseArgs(process.argv)) require('../server.js');
//console.log(process.env.NODE_ENV);
//console.log(process.env.PORT);
//console.log(process.argv);
