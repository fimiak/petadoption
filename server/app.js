/* Express server to host json data */

const express = require('express');
const app = express();
const port = 3000;
const data = require('./../assets/data/dogs.json');
/* json is also being hosted on a free mlab server */

/* Set headers for CORS requests on local server */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* Get the data.json when accessed by this route */
app.get('/', (req, res) => res.send('<h3>Please try http://localhost:3000/data</h3>'));
app.get('/data', (req, res, next) => res.send(data)); // Responds with json data when api accessed

app.listen(port, () => console.log(`Listening on port ${port}.`));
