const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = fs.readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  { encoding: 'utf-8' }
);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

function installGraphQL(app) {
  server.applyMiddleware({ app });
  console.log(`graphql server mount on ${server.graphqlPath}`);
}

module.exports = installGraphQL;
