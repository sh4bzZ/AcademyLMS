const mysql = require('mysql');

function connectToDatabase(
   host = "127.0.0.1",
   port = 3306,
   user = "academyUser",
   password = "academyPass",
   database = "academyDatabase"
) {
   const con = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      port: port
   });
   con.connect(function(err) {
      if (err) {
         console.error("Error connecting to MySQL:", err.message);
         throw err;
      }

      console.log("Connected to MySQL!");
   });
   return con;
}
module.exports = {connectToDatabase};