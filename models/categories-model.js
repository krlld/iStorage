const connection = require("../modules/mysql");

module.exports = {
    getAll: (request, callback) => {
        connection.query(
            `select * from Categories where name like '%${request}%'`,
            [],
            (err, data) => {
                return callback(data);
            }
        );
    },

    add: ({ name }) => {
        connection.query(`insert into Categories (name) values(?)`, [name]);
    },

    update: ({ name, id }) => {
        connection.query(`update Categories set name = ? where id = ?`, [name, id]);
    },

    delete: ({ id }) => {
        connection.query(`delete from Categories where id = ?`, [id]);
    },
};
