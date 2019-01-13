/* Express server to host json data */

//import * from './test.json';
const express = require('express');
const app = express();
const port = 3000;
const data = require('./../assets/data/dogs.json');

app.get('/data', (req, res) => res.send(data));

app.listen(port, () => console.log(`Listening on port ${port}.`));
