/* Express server to host json data */

const express = require('express');
const app = express();
const port = 3000;
const data = require('./../assets/data/dogs.json');
/*
const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongodb://tjg:practice1@ds255784.mlab.com:55784/adoption';
*/

/* Set headers for CORS requests on local server */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/* Get the data.json when accessed by this route */
app.get('/data', (req, res, next) => res.send(data));

app.listen(port, () => console.log(`Listening on port ${port}.`));
