const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const jwt = require('jsonwebtoken');
const resolvers = require('../resolvers/_resolvers');

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: async ( { request }) => {

        const token = request.headers.authorization || '';
        let user = null;

        //Check if the user is authenticated
        try {
            const payload = jwt.verify(token, "secret");
            user = await prisma.user({id: payload.id});
        } catch (e) {
        }
     
        return { user, prisma };
      }
})

server.start(() => console.log('Server is running on http://localhost:4000'))
