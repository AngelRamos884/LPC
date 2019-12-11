const conn = require('../MySqlConnect');

const getPulse = function(req, res){

    const query = conn.query('call getPulse');

    conn.query('call getPulse', function (error, results, fields) {
        if (error) throw error;
        var data = results[0];
        res.status(200).send({ data })
        console.log(data);
        
      });

}

const getByRoomByUser = function(req,res){

    // const query = conn.query('call getByRoomByUser{?,?,?,?,?}');
   
    conn.query('call getByRoomByUser(?,?,?,?,?)',
    [req.body.user,
    req.body.date_from,
    req.body.date_to,
    req.body.room,
    req.body.type],
    function (error, results, fields) {
        if (error) throw error;
        var data = results[0];
        res.status(200).send({ data })
        console.log(data);
        
      });
      
}

const getParams = function(req, res){

    conn.query('call getParams', function (error, results, fields) {
        if (error) throw error;
        var data = results[0];
        res.status(200).send({ data })
      });

}


module.exports = {

    getPulse,
    getByRoomByUser,
    getParams

}