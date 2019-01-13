/* Express server to host json data */

const express = require('express');
const app = express();
const port = 3000;
const data = require('./../assets/data/dogs.json');

const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongodb://tjg:practice1@ds255784.mlab.com:55784/adoption';

app.get('/data', (req, res) => res.send(data));

app.listen(port, () => console.log(`Listening on port ${port}.`));
