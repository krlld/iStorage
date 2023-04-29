module.exports = {
    home: (req, res) => {
        res.render("home", { isHome: true, role: req.body.role });
    },
};
