const catalogModel = require("../models/catalog-model");

module.exports = {
    getAll: (req, res) => {
        const request = req.query.request ? req.query.request : "";
        catalogModel.getAll(request, (categories, catalog) => {
            res.render("catalog", {
                isAdd: true,
                isCatalog: true,
                role: req.body.role,
                categories: categories,
                catalog: catalog,
            });
        });
    },

    add: (req, res) => {
        catalogModel.add(req.body);
        res.redirect("/catalog");
    },

    update: (req, res) => {
        catalogModel.update(req.body);
        res.json(req.body);
    },

    delete: (req, res) => {
        catalogModel.delete(req.body);
        res.json(req.body);
    },
};
