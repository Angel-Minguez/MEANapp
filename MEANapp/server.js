/******************************************************************************************************/
/*      Modulo de control del servidor                                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
var app = require('./config/expressConfig.js');
require('./config/sessionConfig.js');
require('./routes/indexRoute.js')(app);
app.listen(process.env.PORT);
/******************************************************************************************************/
/*      Requerido por /config/bootScript.js                                                           */
/******************************************************************************************************/