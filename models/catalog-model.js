const connection = require("../modules/mysql");

module.exports = {
    getAll: (request, callback) => {
        connection.query(`select * from Categories`, [], (err, categories) => {
            connection.query(
                `select Catalog.id as 'id', Categories.id as 'categoryId', Categories.name as 'category', Catalog.name as 'name', price, src, description
                from Catalog 
                inner join Categories on Catalog.categoryId = Categories.id
                where Catalog.name like '%${request}%' or Catalog.description like '%${request}%'`,
                [],
                (err, catalog) => {
                    return callback(categories, catalog);
                }
            );
        });
    },

    add: ({ categoryId, name, price, src, description }) => {
        connection.query(
            `insert into Catalog (categoryId, name, price, src, description) values(?, ?, ?, ?, ?)`,
            [categoryId, name, price, src, description]
        );
    },

    update: ({ categoryId, name, price, src, description, id }) => {
        connection.query(
            `update Catalog set categoryId = ?, name = ?, price = ?, src = ?, description = ? where id = ?`,
            [categoryId, name, price, src, description, id]
        );
    },

    delete: ({ id }) => {
        connection.query(`delete from Catalog where id = ?`, [id]);
    },
};
