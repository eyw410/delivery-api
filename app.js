// try running this code with `node app.js`, and you'll notice it errors.
// what must you do to make the code work?

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config')
const User = require('./models/schemas/user')
const Coupon = require('./models/schemas/coupon')

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 } } })

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.post('/users/', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  const userData = {
    email: req.body.email,
    hash: req.body.password,
    name: req.body.name
  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return res.status(500).send('Could not create')
    return res.json(newUser)
  })
})

app.get('/users/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send('Error: ' + err)
    return res.json(users)
  })
})

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!')
});