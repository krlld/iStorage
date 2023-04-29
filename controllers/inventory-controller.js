const inventoryModel = require("../models/inventory-model");

module.exports = {
    getAll: (req, res) => {
        const param = {
            request: req.query.request ? req.query.request : "",
            minPrice: req.query.minPrice ? req.query.minPrice : 0,
            maxPrice: req.query.maxPrice ? req.query.maxPrice : 999999999,
            minCount: req.query.minCount ? req.query.minCount : 0,
            maxCount: req.query.maxCount ? req.query.maxCount : 999999999,
            categoryId: req.query.categoryId,
            sort: req.query.sort,
        };
        inventoryModel.getAll(param, (categories, inventory) => {
            res.render("inventory", {
                isInventory: true,
                role: req.body.role,
                categories: categories,
                inventory: inventory,
            });
        });
    },

    getSum: (req, res) => {
        inventoryModel.getSum(req.body, (sum) => {
            res.json({ sum: sum });
        });
    },

    plus: (req, res) => {
        inventoryModel.plus(req.body);
        res.json(req.body);
    },

    minus: (req, res) => {
        inventoryModel.minus(req.body);
        res.json(req.body);
    },
};
