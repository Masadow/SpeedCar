const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type User {
    id: ID,
    name: String,
    age: Int,
    location: String,
    password: String
  }

  type Query {
    me: User
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    me: () => {
      return context.user;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
 
    // Get the user token from the headers.
    const token = req.headers.authorization || '';
 
    // try to retrieve a user with the token
    const user = getUser(token);
 
    // add the user to the context
    return { user };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});