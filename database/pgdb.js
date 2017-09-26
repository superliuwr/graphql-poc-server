const humps = require('humps');
const { slug } = require('../lib/util');

module.exports = pgPool => {
    return {
        getUser(apiKey) {
            return pgPool.query(
                `select * from users where api_key = $1`, [apiKey]
            ).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            });
        },

        getContests(user) {
            return pgPool.query(
                `select * from contests where created_by = $1`, [user.id]
            ).then(res => {
                return humps.camelizeKeys(res.rows);
            });
        },

        addNewContest({ apiKey, title, description }) {
            return pgPool.query(
                `insert into contests (code, title, description, created_by)
                values ($1, $2, $3, (select id from users where api_key = $4))
                returning *
                `, [slug(title), title, description, apiKey]
            ).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            })
        }
    }
};