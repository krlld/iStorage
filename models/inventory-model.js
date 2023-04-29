const connection = require("../modules/mysql");

module.exports = {
    getAll: ({ request, minPrice, maxPrice, minCount, maxCount, categoryId, sort }, callback) => {
        connection.query(
            `select Categories.name as 'CategoryName', Catalog.name as 'CatalogName', price, sum(count) as 'sum', src, Catalog.id as 'catalogId', description
            from Inventory 
            inner join Catalog on Inventory.catalogId = Catalog.id 
            inner join Categories on Catalog.categoryId = Categories.id
            where (Catalog.name like '%${request}%' or Catalog.description like '%${request}%') 
            and price between ${minPrice} and ${maxPrice} and ${
                categoryId ? `Categories.id = ${categoryId}` : `1`
            }
            group by Catalog.id
            having sum(count) between ${minCount} and ${maxCount}
            ${sort ? `order by ${sort}` : ``}`,
            [],
            (err, inventory) => {
                connection.query(
                    `select * from Categories order by name`,
                    [],
                    (err, categories) => {
                        return callback(categories, inventory);
                    }
                );
            }
        );
    },

    getSum: ({ id }, callback) => {
        connection.query(
            `select sum(count) as 'sum'
            from Inventory 
            where Inventory.catalogId = ?
            group by Inventory.catalogId`,
            [id],
            (err, data) => {
                return callback(data[0].sum);
            }
        );
    },

    plus: ({ id, count }) => {
        connection.query(`insert into Inventory (catalogId, count) values(?, ?)`, [id, count]);
    },

    minus: ({ id, count }) => {
        connection.query(`insert into Inventory (catalogId, count) values(?, ?)`, [id, -1 * count]);
    },
};
