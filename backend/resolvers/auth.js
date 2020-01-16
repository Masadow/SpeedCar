var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function encryptPassword(password)
{
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    AuthQuery: {
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
        me(root, args, context) {
            return context.user;
        }
    },
    AuthMutation: {
        signup(root, args, context) {
            let password = args.password;
            if (password) {
                //Secure the password
                password = encryptPassword(password);
            }
            return context.prisma.createUser({ name: args.name, age: args.age, location: args.location, password: password }).then(() => true);
        },
    }
};