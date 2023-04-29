const statisticsModel = require("../models/statistics-model");

module.exports = {
    transfers: (req, res) => {
        statisticsModel.transfers((catalog) => {
            res.render("transfers", {
                isStatistics: true,
                role: req.body.role,
                catalog: catalog,
            });
        });
    },

    abcStatistics: (req, res) => {
        statisticsModel.abcStatistics((catalog) => {
            res.render("abcStatistics", {
                isStatistics: true,
                role: req.body.role,
                catalog: catalog,
            });
        });
    },
};
