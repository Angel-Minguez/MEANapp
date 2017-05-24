/******************************************************************************************************/
/*      Modulo de control del servidor                                                                */
/*      Autor: Angel Minguez Burillo                                                                  */
/******************************************************************************************************/
'use strict'
let app = require('./config/expressConfig.js');                             //Invocamos Express y creamos el objeto aplicacion
require('./config/sessionConfig.js');                                       //Cargamos el modulo de configuracion de sesiones
require('./config/mongoConfig.js').connect('MEANapp', (connection) => {     //Conectamos a la base de datos principal
    require('./models/models.js')('*', connection);                         //Cargamos todos los modelos de datos
    require('./routes/router')(app);                                        //Cargamos el modulo de ruteo
});
app.listen(process.env.PORT);                                               //Lanzamos el servidor
/******************************************************************************************************/
/*      Requerido por /config/bootScript.js                                                           */
/******************************************************************************************************/