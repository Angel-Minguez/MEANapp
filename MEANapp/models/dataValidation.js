﻿/******************************************************************************************************/
/*      Modulo de validacion de datos para los schemas                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 23/5/2017                                                                              */
/******************************************************************************************************/
'use strict'
module.exports._username = function (value) {                     //Validacion de datos cadena
    if (value.length == 0) return false;                        //Nos aseguramos de que no es una cadena vacia
    return /.{5,100}/.test(value);                              //Puede contener hasta 100 caracteres
}
module.exports._password = function (value) {                   //Validacion para email
    if (value == 'INVALID_PWD') return false;                   //Nos aseguramos de que no es una cadena vacia
    return /.{64}/.test(value);                                 //Hash de 64 caracteres
}
module.exports._url = function (value) {                        //Validacion para una URL
    if (value.length == 0) return false;                        //Nos aseguramos de que no es una cadena vacia
    return /.{100}/.test(value);                     			//Debe comenzar con http://
}
module.exports._email = function (value) {                      //Validacion para password
    if (value.length == 0) return false;                        //Nos aseguramos de que no es una cadena vacia
    return /(.{1,100})[@](.{1,100}[.].{1,10})/.test(value);     //Mediante expresion regular comprobamos que tenga el formato correcto
}
module.exports._date = function (value) {                       //Validacion para fechas
    if (value instanceof Date) return true;                     //Comprobamos que la fecha sea un objeto Date
	else return false;                                          //Devolvemos false en caso contrario
}