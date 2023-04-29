const keys = require("./keys");
const jwt = require("jsonwebtoken");
const helper = require("./helper");

module.exports.checkForAuth = (req, res, next) => {
    if (!req.headers.cookie) {
        res.redirect("/login");
        return;
    }

    let jwt_token = helper.getJwtToken(req.headers.cookie);

    if (!jwt_token) {
        res.redirect("/login");
        return;
    }

    try {
        const decoded = jwt.verify(jwt_token, keys.jwt);
        req.body.role = decoded.role;
        next();
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
};

module.exports.checkForAdmin = (req, res, next) => {
    let jwt_token = helper.getJwtToken(req.headers.cookie);

    const decoded = jwt.verify(jwt_token, keys.jwt);
    if (decoded.role !== "Admin") {
        res.render("message", {
            role: req.body.role,
            message: "У вас недостаточно прав для доступа к этой странице",
        });
        return;
    }
    next();
};
