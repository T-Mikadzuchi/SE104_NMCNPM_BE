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
    // router.get('/crud', homeController.getCRUD);
    // router.post('/post-crud', homeController.postCRUD);
    // router.get('/get-crud', homeController.displayGetCRUD);
    // router.get('/edit-crud', homeController.getEditCRUD);
    // router.post('/put-crud', homeController.putCRUD);
    // router.get('/delete-crud', homeController.deleteCRUD);

    // router.post('/api/login', userController.handleLogin);
    router.get('/api/get-user', userController.handleGetUserProfile);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    //router.delete('/api/delete-user', userController.handleDeleteUser);
    // router.put('/api/change-password', userController.handleChangePassword);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/search-users', userController.handleSearchUsersByEmail);

    router.post('/api/add-new-staff', staffController.handleAddNewStaff);
    router.put('/api/update-staff-status', staffController.handleUpdateStaffStatus);
    router.get('/api/get-staff', staffController.handleGetStaff);

    router.get('/api/search-item', itemController.handleSearchItem);
    router.put('/api/update-item', itemController.handleUpdateItem);
    router.get('/api/get-item', itemController.handleGetItem);
    router.get('/api/get-item-sort-by-type', itemController.handleGetItemSortByType);
    router.post('/api/add-item', itemController.handleAddItem);
    router.get('/api/get-featured-item', itemController.handleGetFeaturedItem);

    router.get('/api/get-address', addressController.handleGetAddress);
    router.post('/api/add-address', addressController.handleAddAddress);
    router.delete('/api/delete-address', addressController.handleDeleteAddress);
    router.put('/api/update-address', addressController.handleUpdateAddress);

    router.get('/api/get-restaurant', restaurantController.handleGetRestaurant);

    router.post('/api/add-promotion', promotionController.handleAddPromotion);
    router.get('/api/get-promotion', promotionController.handleGetPromotion);
    router.get('/api/get-current-promotion', promotionController.handleGetCurrentPromotion);

    router.post('/api/create-bill', billController.handleCreateBill);
    router.post('/api/add-item-to-cart', billController.handleAddItemToCart);
    router.get('/api/display-cart', billController.handleDisplayCart);
    router.put('/api/update-cart-item', billController.handleUpdateCartItem);
    router.delete('/api/delete-cart-item', billController.handleDeleteCartItem);
    router.put('/api/purchase', billController.handlePurchase);
    router.get('/api/display-order', billController.handleDisplayOrder);
    router.get('/api/display-order-items', billController.handleDisplayOrderItems);
    router.put('/api/confirm-order', billController.handleConfirmOrder);
    router.put('/api/cancel-order', billController.handleCancelOrder);
    router.put('/api/confirm-delivered', billController.handleConfirmDelivered);
    router.get('/api/get-all-orders', billController.handleGetAllOrders);

    router.get('/allcode', userController.getAllcode);

    return app.use("/", router);
}

module.exports = initWebRoutes;