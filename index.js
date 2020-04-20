const express = require('express');
const app = express();
const path = require('path');
const htmlPath = path.join(__dirname, 'gameWeb4');
const logger = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const { database} = require('./keys');
const mysql = require('mysql');
const { promisify}  = require('util');
const pool = mysql.createPool(database);

//promisify Pool Querys
pool.query = promisify(pool.query);

app.use(session({
  secret: 'niggasecret',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
  }));
app.use('/', express.static(htmlPath));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());


app.use('/getroute', async (req, res) =>{
  const { id } = req.body;

  console.log("El ID es: " + id);

   await pool.query('SELECT * FROM users WHERE id=?', id, (err, rows, fields)=>
   {
     if(!err)
     {

      console.log(rows[0].route)

       res.json(
        {
          route: rows[0].route
        }
      );
     }
     else{
       console.log(err)
     }
   });
});


app.use('/saveroute', async (req, res) =>{
  const { id, route } = req.body;

  console.log(id, route);

  //RECIBIR
  await pool.query('INSERT INTO users set route = ? WHERE id = ?', route, id);
});


//router.post('/',
//function (req, res) {
//  console.log('loginIn');
// console.log(req.body);
// return res.json(req.user);
//});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server on port, negger!');
});

pool.getConnection((err, connection) => {
  if(err){
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
          console.error('DATABASE CONNECTION WAS CLOSED');
      }
      if(err.code === 'ER_CON_COUNT_ERROR')
      {
          console.error('DATABASE HAS TOO MANY CONNECTIONS');
      }
      if(err.code === 'ECONNREFUSED')
      {
          console.error('DATABASE CONNECTION WAS VERY REFUSED');
      }
  }

  if(connection) connection.release();
  console.log('DB IS CONNECTEEED');
  return;
});