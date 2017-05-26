/******************************************************************************************************/
/*      Modulo de definicion de la clase User                                                         */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 15/5/2017                                                                              */
/******************************************************************************************************/
'use strict'
const validate = require('./dataValidation.js');                    //Modulo con funciones de validacion
const mongoose = require('mongoose');                               //Modulo de control de la base de datos
module.exports = class user {                                       //Clase que gestiona y proporciona interfaz a los usuarios
    constructor(connection) {                                       //Constructor, solo invocado una vez, durante la inicializacion del servidor
        this.userSchema = mongoose.Schema({                         //Creacion del esquema de datos como propiedad de la clase
            userName: {                                             //Nombre de usuario, unico y requerido
                type: String,
                validate: {
                    validator: validate._string,
                    message: 'Mongodb validator : {VALUE} user name invalid'
                },
                required: [true, 'Mongodb validator : a name is required for User'],
                unique: true
            },
            userPwd: {                                              //Hash del password, requerida
                type: String,
                validate: {
                    validator: validate._string,
                    message: 'Mongodb validator : {VALUE} password hash is invalid'
                },
                required: [true, 'Mongodb validator : a password hash is required for User']
            },
            userEmail: {                                            //Email del usuario, requerido y unico
                type: String,
                validate: {
                    validator: validate._email,
                    message: 'Mongodb validator : {VALUE} e-mail invalid'
                },
                required: [true, 'Mongodb validator : an email is required for User'],
                unique: true
            },
            userCreationTime: {                                     //Fecha de creacion del usuario, requerido
                type: Date,
                validate: {
                    validator: validate._date,
                    message: 'Mongodb validator : {VALUE} should be a Date object'
                },
                required: [true, 'Mongodb validator : a date of creation is required for User']
            },
            userLastLoginTime: {                                    //Fecha de la ultima vez que el usuario ha logueado con exito
                type: Date,
                validate: {
                    validator: validate._date,
                    message: 'Mongodb validator : {VALUE} should be a Date object'
                }
            }
        });
        this.userModel = connection.model('User', this.userSchema); //Una vez definido el esquema, se crea el modelo como propiedad de la clase
    }
    isUser (userName, callback) {                                               //Metodo de comprobacio de existencia de usuario
        this.userModel.findOne({ userName: userName }, (_err, _user) => {       //Query de busqueda de usuario por nombre
            if (_err) {                                                         //Si existe error
                let errMessages = new Array(_err.message);                                          //Creamos una array para los mensajes de error
                for (let _errName in _err.errors) errMessages.push(_err.errors[_errName].message);  //Poblamos el array con los errores
                callback(errMessages);                                                              //Invocamos el callback con el array de errores
            }
            else if (!_user) callback('NO_RESULT');                             //Si no hay error ni resultados, el usuario no existe
            else callback(_err, _user);                                         //Si existe el usuario, invocamos el callback con su informacion
        });
    };
    createUser(userInfo) {
        userInfo.CreationTime = new Date();
        this.userModel.create(userInfo, (_err, _user) => {
            if (_err) {                                                         //Si existe error
                let errMessages = new Array(_err.message);                                          //Creamos una array para los mensajes de error
                for (let _errName in _err.errors) errMessages.push(_err.errors[_errName].message);  //Poblamos el array con los errores
                callback(errMessages);                                                              //Invocamos el callback con el array de errores
            }
            else callback(_err, _user);                                         //Si existe el usuario, invocamos el callback con su informacion
        });
    }
}
/******************************************************************************************************/
/*      Requerido por /models/models.js                                                               */
/******************************************************************************************************/