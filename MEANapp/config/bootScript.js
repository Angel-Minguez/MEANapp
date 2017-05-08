/******************************************************************************************************/
/*      Modulo de control del servidor                                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
const debug = require('debug')('bootScript');
const log = require('log');
const fs = require('fs');
const stream = require('stream');
var logStream = fs.createWriteStream(__dirname + '/../logs/bootLog.txt',{ flags:"a" });
var passStream = new stream.PassThrough();
//var bootLog = new log('info', passStream);
var logger = new console.Console(passStream);
passStream.pipe(process.stdout);
passStream.pipe(logStream);
//bootLog.info('\nbootScript launched with %s at %s', process.argv.shift(), process.argv.shift());
var envRegExp = new RegExp(/^(--env=)(developement|production)/);
var portRegExp = new RegExp(/^(--port=)([0-9]{2,5}$)/);
var debugRegExp = new RegExp(/^(--debug=)([a-z]{1,100}$)/);
process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';
logger.log(".uiyuryrtyetet");
if(!process.argv.every((_arg, _index) => {
	if (envRegExp.test(_arg)) {
		//process.env.NODE_ENV = envRegExp.exec(_arg)[2];
		//console.log("Environment set: %s", process.env.NODE_ENV);
		bootLog.info("\nEnvironment set: %s", process.env.NODE_ENV);
		return true;
	}
    else if (portRegExp.test(_arg)) { 
			process.env.PORT = portRegExp.exec(_arg)[2];
			return true;
		}
		else if (debugRegExp.test(_arg)) {
				process.env.DEBUG = debug.exec(_arg)[2];
				return true;
			}
	//console.log('Wrong parameter format at parameter ' + _index);
	return false;
})) console.log('Incorrect arguments please use --h for help.');
//console.log(process.env.NODE_ENV);
//console.log(process.env.PORT);
//console.log(process.argv);
require('../server.js');