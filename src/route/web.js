import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import staffController from "../controllers/staffController";
import itemController from "../controllers/itemController";
import billController from "../controllers/billController";
import addressController from "../controllers/addressController";
import restaurantController from "../controllers/restaurantController";
import promotionController from "../controllers/promotionController";

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
    router.put('/api/update-staff-status', staffController.handleUpdateStaffStatus);
    router.get('/api/get-staff', staffController.handleGetStaff);

    router.get('/api/search-item', itemController.handleSearchItem);
    router.put('/api/update-item', itemController.handleUpdateItem);
    router.get('/api/get-item', itemController.handleGetItem);
    router.post('/api/add-item', itemController.handleAddItem);

    router.get('/api/get-address', addressController.handleGetAddress);
    router.post('/api/add-address', addressController.handleAddAddress);

    router.get('/api/get-restaurant', restaurantController.handleGetRestaurant);

    router.post('/api/add-promotion', promotionController.handleAddPromotion);
    router.get('/api/get-promotion', promotionController.handleGetPromotion);

    router.post('/api/create-bill', billController.handleCreateBill);

    router.get('/allcode', userController.getAllcode);

    return app.use("/", router);
}

module.exports = initWebRoutes;