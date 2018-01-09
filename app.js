// try running this code with `node app.js`, and you'll notice it errors.
// what must you do to make the code work?

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config')
const routes = require('./routes/index')

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 } } })

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes)

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!')
});