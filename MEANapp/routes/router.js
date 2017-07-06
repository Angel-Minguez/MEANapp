/******************************************************************************************************/
/*      Modulo de ruteo                                                                               */
/*      Autor: Angel Minguez Burillo                                                                  */
/*      Fecha: 7/5/2017                                                                               */
/******************************************************************************************************/
'use strict'
//Funcion que se exporta, recibe el objeto aplicacion como parametro
const upload = require('../config/expressConfig.js').uploads; 					//Modulo de configuracion de Express, instancia de multer
module.exports = function router(app) {
    function router(req, res, next) {                                       	//Funcion middleware de routeo de requests
        app.get('/*', require('../controllers/indexMain.js'));              	//Landing page
        app.post('/login', require('../controllers/loginMain.js'));				//Recepcion de peticiones de login
        app.post('/logout', require('../controllers/logoutMain.js'));       	//Recepcion de peticiones de logout
        app.post('/register', require('../controllers/registerMain.js'));   	//Recepcion de peticiones de registro
		app.post('/authenticator', require('../controllers/authMain.js'));  	//Recepcion de peticiciones de autenticacion
		app.post('/pwdRecovery', require('../controllers/pwdRecoveryMain.js')); //Recepcion de peticiciones de recuperacion de contraseña
		app.post('/newPwd', require('../controllers/newPwdMain.js'));			//Recepcion de nueva contraseña
		app.post('/userProfile', upload.single('avatarImg'), require('../controllers/userProfileMain.js')); //Recepcion de cambios en el perfil de usuario
        next();                                                             	//Invocamos el siguiente elemento de la pila de middleware  
    }
    app.use('/', router);                                                   //Añadimos router a la pila de middleware
}
/******************************************************************************************************/
/*      Requerido por /server.js                                                                      */
/******************************************************************************************************/