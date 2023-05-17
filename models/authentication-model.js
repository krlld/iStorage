const connection = require('../modules/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../modules/keys');

module.exports = {
  authentication: ({ login, password }, callback) => {
    connection.query(
      `select Users.id as 'id', login, hashPassword, role
            from Users 
            inner join Roles on Users.roleId = Roles.id
            where login = ?`,
      [login],
      (err, data) => {
        if (!data.length) {
          return callback({ message: 'Аккаунт с таким логином не существует' });
        }
        if (bcrypt.compareSync(password, data[0].hashPassword)) {
          const token = jwt.sign(
            {
              id: data[0].id,
              login: data[0].login,
              hashPassword: data[0].hashPassword,
              role: data[0].role,
            },
            keys.jwt,
            {
              expiresIn: '24h',
            }
          );
          return callback({ token: token });
        } else {
          return callback({ message: 'Некорректный пароль' });
        }
      }
    );
  },

  decode: (jwt_token) => {
    return jwt.verify(jwt_token, keys.jwt);
  },
};
