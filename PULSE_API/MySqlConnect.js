const MySql = require('mysql');
const CONFIG = require('./config');

var connection = MySql.createConnection({
    host     : CONFIG.host,
    user     : CONFIG.user,
    password : CONFIG.password,
    database : CONFIG.database
  });
 
module.exports = connection;