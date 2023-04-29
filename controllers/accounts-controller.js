const accountsModel = require("../models/accounts-model");

module.exports = {
    getAll: (req, res) => {
        const request = req.query.request ? req.query.request : "";
        accountsModel.getAll(request, (roles, users) => {
            res.render("accounts", {
                isAdd: true,
                isAccounts: true,
                role: req.body.role,
                users: users,
                roles: roles,
            });
        });
    },

    add: (req, res) => {
        accountsModel.add(req.body);
        res.json({ url: "/accounts" });
    },

    checkLoginForUse: (req, res) => {
        accountsModel.checkLoginForUse(req.body, (data) => {
            res.json({ isUse: data.length ? true : false });
        });
    },

    delete: (req, res) => {
        accountsModel.delete(req.body);
        res.json(req.body);
    },
};
