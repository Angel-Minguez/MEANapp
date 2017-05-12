/******************************************************************************************************/
/*      Modulo de control del servidor                                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
var app = require('./config/expressConfig.js');
require('./config/sessionConfig.js');
require('./config/mongoConfig.js')('MEANapp',(connection)=>{
	process.env.DB_CONNECTION = connection;
	require('./routes/indexRoute.js')(app);
	require('./models/userModel.js');
	app.listen(process.env.PORT);
});
//app.listen(process.env.PORT);
/******************************************************************************************************/
/*      Requerido por /config/bootScript.js                                                           */
/******************************************************************************************************/