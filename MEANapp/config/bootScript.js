/******************************************************************************************************/
/*      Modulo de control del servidor                                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
const debug = require('debug')('bootScript');
const log = require('log');
const fs = require('fs');
var bootLog = new log('info', fs.createWriteStream(__dirname + '/../logs/bootLog.txt')); 
bootLog.info('bootScript launched with %s at %s', process.argv.shift(), process.argv.shift());
var envRegExp = new RegExp(/^(--env=)(developement|production)/);
var portRegExp = new RegExp(/^(--port=)([0-9]{2,5}$)/);
process.env.NODE_ENV = process.env.npm_package_config_environment || 'developement';
console.log(process.argv);
process.argv.forEach((_arg, _index) => {
    if (envRegExp.test(_arg)) process.env.NODE_ENV = RegExp.$2;
    else console.log("Error");
    if (portRegExp.test(_arg)) process.env.PORT = RegExp.$2;
    else console.log("Error");
});
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.npm_package_config_environment);
require('../server.js');