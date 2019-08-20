const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const db = require('./db');
const installGraphQL = require('./graphql-server');

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();

app.use(
  cors(),
  bodyParser(),
  expressJwt({
    secret,
    credentialsRequired: false
  })
);

installGraphQL(app);

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!user || user.password !== password) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, secret);
  res.send({ token });
});

const port = 9000;
app.listen(port, () => console.log(`server start on port ${port}.`));
