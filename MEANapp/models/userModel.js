/******************************************************************************************************/
/*      Modulo de definicion de la clase User                                                         */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 15/5/2017                                                                              */
/******************************************************************************************************/
'use strict'
const mongoose = require('mongoose');
module.exports = class user {
	constructor(connection) {
        this.userSchema = mongoose.Schema({
            userName: 	{		
							type: String,
							validate: {
								validator: function(value){
									return /.{1,25}/.test(value);
								},
								message: 'Mongodb validator : {VALUE} user name invalid'
							},
							required: [true, 'Mongodb validator : a name is required for User']
						},			
            userPwd: 	{		
							type: String,
							validate: {
								validator: function(value){
									return /.{1,100}/.test(value);
								},
								message: 'Mongodb validator : {VALUE} password hash is invalid'
							},
							required: [true, 'Mongodb validator : a password hash is required for User']
						},			
            userEmail: {		
							type: String,
							validate: {
								validator: function(value){
									return /(.{1,100})[@](.{1,100}[.].{1,10})/.test(value);
								},
								message: 'Mongodb validator : {VALUE} e-mail invalid'
							},
							required: [true, 'Mongodb validator : an email is required for User']
						}			,
            userCreationTime:{		
							type: Date,
							validate: {
								validator: function(value){
									return value instanceof Date;
								},
								message: 'Mongodb validator : {VALUE} should be a Date object'
							},
							required: [true, 'Mongodb validator : a date of creation is required for User']
						},			
            userLastLoginTime:{		
							type: Date,
							validate: {
								validator: function(value){
									return value instanceof Date;
								},
								message: 'Mongodb validator : {VALUE} should be a Date object'
							}
						}
        });
        this.userModel = connection.model('User', this.userSchema);
	}
    static say() {
        console.log('Hola')
    };
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/