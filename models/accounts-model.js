const connection = require("../modules/mysql");
const bcrypt = require("bcryptjs");

module.exports = {
    getAll: (request, callback) => {
        connection.query(
            `select Users.id as 'id', login, hashPassword, Roles.role as 'role', Users.roleId as 'roleId' 
            from Users inner join Roles on Users.roleId = Roles.id
            where login like "%${request}%"`,
            (err, users) => {
                connection.query("select * from Roles", (err, roles) => {
                    return callback(roles, users);
                });
            }
        );
    },

    add: ({ login, password, roleId }) => {
        connection.query(`insert into Users (login, hashPassword, roleId) values (?, ?, ?)`, [
            login,
            bcrypt.hashSync(password, 8),
            roleId,
        ]);
    },

    checkLoginForUse: ({ login }, callback) => {
        connection.query(`select * from Users where login = ?`, [login], (err, data) => {
            return callback(data);
        });
    },

    delete: ({ id }) => {
        connection.query(`delete from Users where id = ?`, [id]);
    },
};
