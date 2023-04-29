const categoriesModel = require("../models/categories-model");

module.exports = {
    getAll: (req, res) => {
        const request = req.query.request ? req.query.request : "";
        categoriesModel.getAll(request, (categories) => {
            res.render("categories", {
                isAdd: true,
                isCategories: true,
                role: req.body.role,
                categories: categories,
            });
        });
    },

    add: (req, res) => {
        categoriesModel.add(req.body);
        res.redirect("/categories");
    },

    update: (req, res) => {
        categoriesModel.update(req.body);
        res.json(req.body);
    },

    delete: (req, res) => {
        categoriesModel.delete(req.body);
        res.json(req.body);
    },
};
