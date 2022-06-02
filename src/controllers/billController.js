import billService from '../services/billService'
import admin from '../config/firebase-config'

let extractUID = async (idToken) => {
    try {
        let decodeValue = await admin.auth().verifyIdToken(idToken);
        if (decodeValue) {
            console.log(decodeValue)
            return decodeValue.uid;
        }
        console.log("Unauthorize")
        return null;
    } catch (error) {
        console.log('Internal error')
        console.log(error)
        return null;
    }
}
let handleCreateBill = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let message = await billService.createBill(uid);
    return res.status(200).json(message);
}
let handleAddItemToCart = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let message = await billService.addItemToCart(uid, req.body);
    return res.status(200).json(message);
}
let handleDisplayCart = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            cartItems: []
        });
    }
    let cartItems = await billService.displayCart(uid);
    console.log(cartItems);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        cartItems
    });
}
let handleUpdateCartItem = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let data = req.body;
    let message = await billService.updateCartItem(uid, data);
    return res.status(200).json(message);
}
let handleDeleteCartItem = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let data = req.body;
    let message = await billService.deleteCartItem(uid, data);
    return res.status(200).json(message);
}
let handlePurchase = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let data = req.body;
    let message = await billService.purchase(uid, data);
    return res.status(200).json(message);
}
let handleDisplayOrder = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            orders: []
        });
    }
    let orders = await billService.displayOrder(uid);
    console.log(orders);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        orders
    });
}
let handleDisplayOrderItems = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            items: []
        });
    }
    let items = await billService.displayOrderItems(id);
    console.log(items);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        items
    });
}
let handleConfirmOrder = async(req, res) => {
    let id = req.query.id;
    let message = await billService.confirmOrder(id);
    return res.status(200).json(message);
}
let handleCancelOrder = async(req, res) => {
    let id = req.query.id;
    let data = req.body;
    let message = await billService.cancelOrder(id, data);
    return res.status(200).json(message);
}
let handleConfirmDelivered = async(req, res) => {
    let data = req.query.id;
    let message = await billService.confirmDelivered(data);
    return res.status(200).json(message);
}
let handleGetAllOrders = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            orders: []
        });
    }
    let orders = await billService.getAllOrders(uid);
    console.log(orders);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        orders
    });
}

module.exports = {
    handleCreateBill: handleCreateBill,
    handleAddItemToCart: handleAddItemToCart,
    handleDisplayCart: handleDisplayCart,
    handleUpdateCartItem: handleUpdateCartItem,
    handleDeleteCartItem: handleDeleteCartItem,
    handlePurchase: handlePurchase,
    handleDisplayOrder: handleDisplayOrder,
    handleDisplayOrderItems: handleDisplayOrderItems,
    handleConfirmOrder: handleConfirmOrder,
    handleCancelOrder: handleCancelOrder,
    handleConfirmDelivered: handleConfirmDelivered,
    handleGetAllOrders: handleGetAllOrders
}