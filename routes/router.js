const { Router } = require("express");
const categoriesController = require("../controllers/categories-controller");
const catalogController = require("../controllers/catalog-controller");
const accountsController = require("../controllers/accounts-controller");
const authenticationController = require("../controllers/authentication-controller");
const inventoryController = require("../controllers/inventory-controller");
const statisticsController = require("../controllers/statistics-controller");
const homeController = require("../controllers/home-controller");
const router = Router();
const middlewares = require("../modules/middlewares");

router.get("/login", authenticationController.login);

router.post("/authentication", authenticationController.authentication);

router.get("/profile", middlewares.checkForAuth, authenticationController.profile);

router.post("/authentication/exit", middlewares.checkForAuth, authenticationController.exit);

router.get("/", middlewares.checkForAuth, homeController.home);

router.get("/inventory", middlewares.checkForAuth, inventoryController.getAll);

router.post("/inventory/getSum", middlewares.checkForAuth, inventoryController.getSum);

router.post("/inventory/plus", middlewares.checkForAuth, inventoryController.plus);

router.post("/inventory/minus", middlewares.checkForAuth, inventoryController.minus);

router.get(
    "/categories",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    categoriesController.getAll
);

router.post(
    "/categories/add",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    categoriesController.add
);

router.post(
    "/categories/update",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    categoriesController.update
);

router.post(
    "/categories/delete",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    categoriesController.delete
);

router.get(
    "/catalog",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    catalogController.getAll
);

router.post(
    "/catalog/add",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    catalogController.add
);

router.post(
    "/catalog/update",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    catalogController.update
);

router.post(
    "/catalog/delete",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    catalogController.delete
);

router.get(
    "/accounts",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    accountsController.getAll
);

router.post(
    "/accounts/add",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    accountsController.add
);

router.post(
    "/accounts/checkLoginForUse",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    accountsController.checkLoginForUse
);

router.post(
    "/accounts/delete",
    middlewares.checkForAuth,
    middlewares.checkForAdmin,
    accountsController.delete
);

router.get("/transfers", middlewares.checkForAuth, statisticsController.transfers);

router.get("/abcStatistics", middlewares.checkForAuth, statisticsController.abcStatistics);

module.exports = router;
