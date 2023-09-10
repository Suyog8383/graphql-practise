const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();

  const typeDefs = `
  type Users{
    id:ID!
    username:String!
    password:String!
    phone:String!
  }
  type Products {
    id:ID!
    title:String!
    category:String!
}

type Query {
    getProducts:[Products]
    getAllUsers:[Users]
    }
`;

  const resolvers = {
    Query: {
      getProducts: async () =>
        (await axios.get("https://fakestoreapi.com/products")).data,

      getAllUsers: async () =>
        (await axios.get("https://fakestoreapi.com/users")).data,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors);

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
