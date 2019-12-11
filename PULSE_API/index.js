const app = require('./app');
const connection = require('./MySqlConnect');
const CONFIG = require('./config');

app.listen(CONFIG.PORT, function(){

    console.log("Server on Port: " + CONFIG.PORT);

    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected as id ' + connection.threadId);
      });

})


