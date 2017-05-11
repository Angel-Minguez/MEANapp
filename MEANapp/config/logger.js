/******************************************************************************************************/
/*      Modulo para la funcion logger que genera archivos de log                                      */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 8/5/2017                                                                               */
/******************************************************************************************************/
'use strict'
const path = require('path');                       	//Modulo para manejo de paths
const stream = require('stream').Writable           	//Requerimos el modulo de control de streams
const fs = require('fs');                           	//Modulo de control de ficheros
//Opciones: Se suministra mediante el objeto options
//options {
//	flags  : (cadena)	'r+' 	Modo de acceso al fichero 
//	silent : (boolean)	'false'	Si se muestra echo de lo escrito en el log por pantalla
//	size   : (number)   '1024'	Tamaño del archivo de log en bytes, el exceso es truncado, borrando las entradas mas antiguas
//	offset : (number)	'1024' 	Offset para evitar que tras cada escritura se trunque el archivo, se truncara cada 'offset' bytes
//}
//Clase stream.Writable que usa logger
class loggerClass extends stream {                          //Heredamos de la clase stream.Writable
    constructor(log, options, config) {                     //Constructor
        super(config);                                      //Utilizamos el constructor de la clase padre
        this._rotating = false;                             //Flag que indica que se esta rotando el log
        this._opt = {										//Objeto que carga las opciones por defecto si no se han informado otras
            flags: options.flags    || 'a+',				//Modo lectura/escritua
            silent: options.silent  || false,				//Echo en pantalla habilitado
            size: options.size      || 1024,				//1 Kb de tamaño
            offset: options.offset  || 1024					//1 Kb de offset
        }
        this._path = log;
        this.fileStream = fs.createWriteStream(this._path, { flags: this._opt.flags }); 
    }							
    _write(chunk, encoding, callback) {								//Implementacion del metodo _write	
        var time = new Date();										//Capturamos la hora y dia actual
		var str = '['+time.toUTCString()+'] '+chunk.toString();		//Unimos el mensaje y la fecha
        this.lookForRotate();                                       //Comprobamos que no haga falta rotar el log
        this.fileStream.write(str, 'utf8');	                        //Escribimos el mensaje en el log
        process.stdout.write(str, 'utf8');							//Lo mostramos tambien a traves de la consola
        callback();													//Invocamos el callback, para que se pueda continuar con otros mensajes
    }
    lookForRotate() {											    //Metodo que chequea si es necesario una rotacion, y la realiza
        if (this._rotating) return;
        this._rotating = true;
        fs.stat(this._path, (err, stats) => {									                //Recogemos el tamaño del archivo de log
            if (err) console.log(err.message);								                    //Recogemos el error en caso de haberlo
            if (stats.size > this._opt.size + this._opt.offset) {						        //Si es mayor del permitido, lo truncamos
                fs.readFile(this._path, { encoding: 'utf8' }, (err, data) => {	                //Leemos el contenido del log
                    if (err) console.log(err.message);						                    //Recogemos el error en caso de haberlo
                    fs.truncate(this._path, 0, () => {							                //Vaciamos el archivo
						this.fileStream.write(data.slice(this._opt.offset*-1), 'utf8', () => {  //Rellenamos el log con la informacion recortada
                            this._rotating = false
                        });   
                    });
                });
            }
        });
    }	
}    
//Funcion logger, devuelve una nueva consola que ademas escribe el contenido en un archivo de log
module.exports = function (options, log) {
    var logger = new loggerClass(options, log);				//Instanciamos nuestro stream.Writable   
    return new console.Console(logger);      				//Devolvemos una instancia de la consola enlazada al stream
}
/******************************************************************************************************/
/*      Requerido por /bootScrip.js                                                                   */
/******************************************************************************************************/