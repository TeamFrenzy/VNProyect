const express = require('express');
const app = express();
const path = require('path');
const htmlPath = path.join(__dirname, 'game');
const logger = require('morgan');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');


app.use('/game', express.static(htmlPath));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use('/',
  function (req, res) {
    console.log('loginIn');
    console.log(req.body);
    const { id, username, password, route } = req.body;
    console.log(username);
    return res.json(req.user);
  });


router.post('/',
  function (req, res) {
    console.log('loginIn');
    console.log(req.body);
    return res.json(req.user);
  });

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server on port!');
});