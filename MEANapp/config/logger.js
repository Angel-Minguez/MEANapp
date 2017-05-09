/******************************************************************************************************/
/*      Modulo para la funcion logger que genera archivos de log                                      */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 8/5/2017                                                                               */
/******************************************************************************************************/
'use strict'
const path = require('path');                                                                           //Modulo para manejo de paths
const stream = require('stream').Writable/*.Duplex;   */                                                                    //Requerimos el modulo de control de streams
const fs = require('fs');                                                                               //Modulo de control de ficheros

module.exports = function (_path, options) {                                                            //Como parametros usamos la ruta al archivo de log y las flags de acceso al archivo
    //if (!options.silent) /*passStream*/logger.pipe(process.stdout);           




    let fileStream = fs.createWriteStream(path.relative(__dirname, _path), { flags: "r+", start: 0 });  
    class duplexLogger extends stream {
        constructor(config) {
            super(config);
        }
        /*_read(size) { return super.read(size); }*/
        _write(chunk, encoding, callback) {
            var date = new Date();
            var str = chunk.toString() + date.toISOString();
            /*return super.write(str, 'utf8', callback);*/


            fileStream.write(str, 'utf8');
            process.stdout.write(str, 'utf8');
          //  callback();
        }
    }
    var logger = new duplexLogger();
    //Creamos un stream duplex que actua como stream de lectura y escritura

     //Creamos el stream de escritura que escribira en el archivo de log
                                        //Enlazamos lo que se escriba en el stream duplex a la salida estandar (pantalla)
    /*passStream*//*logger.pipe(fileStream);  */                                                                      //Enlazamos lo que se escriba en el stream duplex al stream que escribe en el log
    return new console.Console(/*passStream*/logger );                                                             //Creamos una nueva consola que recibira lo mensajes
}