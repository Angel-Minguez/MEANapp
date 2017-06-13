/******************************************************************************************************/
/*      Modulo de definicion de la clase User                                                         */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 15/5/2017                                                                              */
/******************************************************************************************************/
'use strict'
const validate = require('./dataValidation.js');                    //Modulo con funciones de validacion
const hash = require('sha.js');									    //Modulo de hasheo 
const mongoose = require('mongoose');                               //Modulo de control de la base de datos
module.exports = class user {                                       //Clase que gestiona y proporciona interfaz a los usuarios
    constructor(connection) {                                       //Constructor, solo invocado una vez, durante la inicializacion del servidor
        this.userSchema = mongoose.Schema({                         //Creacion del esquema de datos como propiedad de la clase
            userName: {                                             //Nombre de usuario, unico y requerido
                type: String,
                validate: {
                    validator: validate._username,
                    message: 'Invalid user name. Usernames must be at least 5 characters long'
                },
                required: [true, 'A user name is required.'],
                unique: true
            },
            userPwd: {                                              //Hash del password, requerida
                type: String,
                validate: {
                    validator: validate._password,
                    message: 'Invalid password, it has to be 8 characters long and include at least one digit.'
                },
                required: [true, 'A password is required.']
            },
            userPwdRecoveryUrl: {                                              //Hash del password, requerida
                type: String,
                validate: {
                    validator: validate._url,
                    message: 'Invalid URL'
                }
            },
            userPwdRecoveryTimeout: {
                type: Date,
                validate: {
                    validator: validate._date,
                    message: '{VALUE } should be a Date object'
                }
            },
            userEmail: {                                            //Email del usuario, requerido y unico
                type: String,
                validate: {
                    validator: validate._email,
                    message: 'Please enter a valid e-mail.'
                },
                required: [true, 'An e-mail is required.'],
                unique: true
            },
            userCreationTime: {                                     //Fecha de creacion del usuario, requerido
                type: Date,
                validate: {
                    validator: validate._date,
                    message: '{VALUE} should be a Date object'
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
            if (_err) callback(_err.message);                                   //Si existe error invocamos el callback con el array de errores
            else if (!_user) callback('User not found!');       					//Si no hay error ni resultados, el usuario no existe
            else callback(_err, _user);                                         //Si existe el usuario, invocamos el callback con su informacion
        });
    };
    isEmail(userEmail, callback) {                                                  //Metodo de comprobacio de existencia de usuario
        this.userModel.findOne({ userEmail: userEmail }, (_err, _user) => {         //Query de busqueda de usuario por nombre
            if (_err) callback(_err.message);                                       //Si existe error invocamos el callback con el array de errores
            else if (!_user) callback('Email not found');  							//Si no hay error ni resultados, el usuario no existe
            else callback(_err, _user);                                             //Si existe el usuario, invocamos el callback con su informacion
        });
    };
	
    createUser(userInfo, callback) {                                                    //Funcion de creacion de usuario
        userInfo.userCreationTime = new Date;                                           //Añadimo el campo fecha de creacion
                                               //En caso de password no valida poblamos el campo para que el validador lance un error
        this.userModel.create(userInfo, (_err, _user) => {                              //Creamos al usuario a traves del objeto modelo con los datos provistos
            if (_err) {                                         
                let errMessages = new Array();                                                          //Creamos una array para los mensajes de error
                errMessages.push(_err.message);                                                         //Si existe otro tipo de error lo incluimos en el array
                if (_err.name == 'ValidationError') {                                                   //Si existe error de validacion                                 
                    for (let _errName in _err.errors) errMessages.push(_err.errors[_errName].message);  //Poblamos el array con los errores                                 
                }
                callback(errMessages);                                                                  //Invocamos el callback con el array de errores
            }
            else callback(_err, _user);                                                                 //Si existe el usuario, invocamos el callback con su informacion
        });
    }
}
/******************************************************************************************************/
/*      Requerido por /models/models.js                                                               */
/******************************************************************************************************/