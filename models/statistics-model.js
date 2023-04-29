const connection = require("../modules/mysql");
const statistics = require("../modules/statistics");

module.exports = {
    transfers: (callback) => {
        connection.query(
            `select Catalog.name as 'CatalogName', count, Inventory.id as'id', orderDate
            from Inventory 
            inner join Catalog on Inventory.catalogId = Catalog.id 
            where count != 0
            order by Inventory.id desc`,
            (err, data) => {
                return callback(statistics.transfers(data));
            }
        );
    },

    abcStatistics: (callback) => {
        connection.query(
            `select Catalog.name as 'CatalogName', -1 * sum(count) * price as 'sum', price, Catalog.id as 'id'
            from Inventory 
            inner join Catalog on Inventory.catalogId = Catalog.id 
            inner join Categories on Catalog.categoryId = Categories.id
            where count < 0
            group by Catalog.id
            order by sum desc`,
            (err, data) => {
                return callback(statistics.abc(data));
            }
        );
    },
};
