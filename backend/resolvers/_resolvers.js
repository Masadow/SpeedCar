//Import resolvers
const { AuthQuery, AuthMutation} = require('../resolvers/auth');
const { CarQuery, CarMutation} = require('../resolvers/car');

module.exports = {
  Query: {
      ...AuthQuery,
      ...CarQuery
  },
  Mutation: {
      ...AuthMutation,
      ...CarMutation
  }
}
