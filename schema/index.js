const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const MeType = require('./types/me');
const pgdb = require('../database/pgdb');
const AddContestsMutation = require('./mutations/add-contests');

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",

    fields: {
        hello: {
            type: GraphQLString,
            description: "print hello",
            resolve: () => "hello"
        },
        me: {
            type: MeType,
            description: "my information",
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getUser(args.key);
            }
        }
    }
});

const RootMutationType = new GraphQLObjectType({
    name: "RootMutationType",

    fields: {
        AddContests: AddContestsMutation
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;