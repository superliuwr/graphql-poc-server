const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb');
const ContestsType = require('../types/contest');

const ContestsInputType = new GraphQLInputObjectType({
    name: 'ContestsInput',

    fields: {
        apiKey: {
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        }
    }
});

module.exports = {
    type: ContestsType,
    args: {
        input: {
            type: new GraphQLNonNull(ContestsInputType)
        }
    },
    resolve(obj, { input }, { pgPool }) {
        return pgdb(pgPool).addNewContest(input);
    }
};