const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./schema/typeDefs");
// const resolvers = require("./resolvers/resolvers");
const resolvers = require("./resolvers");
const mongoDataMethod = require("./db/data");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const app = express();
server.applyMiddleware({ app });

connectDB();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
