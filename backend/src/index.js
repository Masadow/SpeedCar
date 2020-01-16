const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require("apollo-server");
var bcrypt = require('bcryptjs');

function encryptPassword(password)
{
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const resolvers = {
  Query: {
    async authToken(root, args, context) {
        let token = "";
        const payload = {name: args.name};
        const users = (await context.prisma.users({where: payload}));
        users.forEach(user => {
            if (bcrypt.compareSync(args.password, user.password)) {
                //User successfully authenticate
                token = jwt.sign({id: user.id}, "secret")
            }
        })
        return token;
    },
    users(root, args, context) {
        return context.prisma.users();
    },
    me(root, args, context) {
        return context.user;
    }
  },
  Mutation: {
    createUser(root, args, context) {
        let password = args.password;
        if (password) {
            //Secure the password
            password = encryptPassword(password);
        }
        return context.prisma.createUser({ name: args.name, age: args.age, location: args.location, password: password })
    },
  }
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: async ( { request }) => {

        const token = request.headers.authorization || '';
        let user = null;

        console.log(token);

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
