/******************************************************************************************************/
/*      Modulo para la funcion logger que genera archivos de log                                      */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 8/5/2017                                                                               */
/******************************************************************************************************/
'use strict'
const path = require('path');                       	//Modulo para manejo de paths
const stream = require('stream').Writable           	//Requerimos el modulo de control de streams
const fs = require('fs');                           	//Modulo de control de ficheros
//Funcion logger, devuelve una nueva consola que ademas escribe el contenido en un archivo de log
//Opciones: Se suministra mediante el objeto options
//options {
//	flags  : (cadena)	'r+' 	Modo de acceso al fichero 
//	silent : (boolean)	'false'	Si se muestra echo de lo escrito en el log por pantalla
//	size   : (number)   '1024'	Tamaño del archivo de log en bytes, el exceso es truncado, borrando las entradas mas antiguas
//	offset : (number)	'1024' 	Offset para evitar que tras cada escritura se trunque el archivo, se truncara cada 'offset' bytes
//}
// Funcion contenedora del modulo
module.exports = function (_path, options) {      		//Como parametros usamos la ruta al archivo de log y un objeto options
    let _opt = {										//Objeto que carga las opciones por defecto si no se han informado otras
		flags: 	options.flags 	|| 'a+',				//Modo lectura/escritua
		silent:	options.silent 	|| false,				//Echo en pantalla habilitado
		size: 	options.size 	|| 1024,				//1 Kb de tamaño
		offset: options.offset  || 1024					//1 Kb de offset
	}
	let fileStream = fs.createWriteStream(_path, {flags:_opt.flags}); 	//Creamos el stream para escribir en el fichero 
	//Clase stream.Writable que usa logger	
	class loggerClass extends stream {
        constructor(config) { super(config); }							//Utilizamos el constructor de la clase padre
        _write(chunk, encoding, callback) {								//Implementacion del metodo _write	
            var time = new Date();										//Capturamos la hora y dia actual
			var str = '['+time.toUTCString()+']'+chunk.toString();		//Unimos el mensaje y la fecha
            fileStream.write(str, 'utf8', lookForTruncate);				//Escribimos el mensaje en el log
			process.stdout.write(str, 'utf8');							//Lo mostramos tambien a traves de la consola
			callback();													//Invocamos el callback, para que se pueda continuar
        }
    }
    //Funcion callback que trunca el archivo si es necesario
	function lookForTruncate() {											//Cada vez que termina un mensaje
		fs.stat(_path, (err, stats)=>{										//Recogemos el tamaño del archivo de log
			if(err) console.log(err.message);								//Recogemos el error en caso de haberlo
			if (stats.size > _opt.size + _opt.offset){						//Si es mayor del permitido, lo truncamos
				fs.readFile(_path, {encoding:'utf8'}, (err, data) => {		//Leemos el contenido del log
					if(err) console.log(err.message);						//Recogemos el error en caso de haberlo
					fs.truncate(_path, 0, ()=>{								//Vaciamos el archivo
						fileStream.write(data.slice(0, _opt.offset));		//Rellenamos el log con la informacion recortada
					});		
				});
			}
		});
	}	
	var logger = new loggerClass();							//Instanciamos nuestro stream.Writable   
    return new console.Console(logger);      				//Exportamos una instancia de la consola enlazada al stream
}