import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import staffController from "../controllers/staffController";
import itemController from "../controllers/itemController";
import billController from "../controllers/billController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    // signup api here 
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/change-password', userController.handleChangePassword);

    router.post('/api/add-new-staff', staffController.handleAddNewStaff);

    router.get('/api/search-item', itemController.handleSearchItem);
    router.put('/api/update-item', itemController.handleUpdateItem);

    router.post('/api/create-bill', billController.handleCreateBill);

    router.get('/allcode', userController.getAllcode);

    return app.use("/", router);
}

module.exports = initWebRoutes;