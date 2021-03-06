const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');

const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
    name: 'Contest',
    fields: {
        id: {
            type: GraphQLID
        },
        code: {
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        status: {
            type: new GraphQLNonNull(ContestStatusType)
        },
        createdAt: {
            type: GraphQLString
        }
    }
});