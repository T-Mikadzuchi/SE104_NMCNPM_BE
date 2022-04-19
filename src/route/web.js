import express from "express";
import { route } from "express/lib/application";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/post-crud', homeController.postCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;