const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db');

const port = 3000;
const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();

app.use(expressJwt({
  secret,
  credentialsRequired: false
}));

const typeDefs = `
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'hello graphql'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({
  app,
  path: '/graphql'
});

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

app.listen(port, () => console.log(`server start on port ${port}.`));
