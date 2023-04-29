const authenticationModel = require("../models/authentication-model");
const helper = require("../modules/helper");

module.exports = {
    login: (req, res) => {
        res.render("login", { dontShowNavbar: true });
    },

    authentication: (req, res) => {
        authenticationModel.authentication(req.body, (info) => {
            if (info.message) {
                res.json(info);
            }
            if (info.token) {
                res.setHeader("Set-Cookie", `jwt_token="Bearer ${info.token}"; path=/;HttpOnly`);
                res.json({ url: "/" });
            }
        });
    },

    profile: (req, res) => {
        let jwt_token = helper.getJwtToken(req.headers.cookie);
        const decoded = authenticationModel.decode(jwt_token);
        res.render("profile", { isProfile: true, role: req.body.role, token: decoded });
    },

    exit: (req, res) => {
        res.clearCookie("jwt_token");
        res.redirect("/");
    },
};
