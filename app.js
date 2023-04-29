// express
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/router");
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.listen(3000);

//cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
    helpers: {
        ifEquals: (arg1, arg2, options) => {
            return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        },
    },
    extname: "hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
