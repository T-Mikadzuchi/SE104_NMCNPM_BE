import billService from '../services/billService'

let handleCreateBill = async (req, res) => {
    let message = await billService.createBill(req.body);
    return res.status(200).json(message);
}
let handleAddItemToCart = async (req, res) => {
    let message = await billService.addItemToCart(req.body);
    return res.status(200).json(message);
}
let handleDisplayCart = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            cartItems: []
        });
    }
    let cartItems = await billService.displayCart(id);
    console.log(cartItems);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        cartItems
    });
}
let handleUpdateCartItem = async(req, res) => {
    let data = req.body;
    let message = await billService.updateCartItem(data);
    return res.status(200).json(message);
}
let handlePurchase = async(req, res) => {
    let data = req.body;
    let message = await billService.purchase(data);
    return res.status(200).json(message);
}
let handleDisplayOrder = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            orders: []
        });
    }
    let orders = await billService.displayOrder(id);
    console.log(orders);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        orders
    });
}
let handleDisplayOrderItems = async(req, res) => {
    let id = req.body.id;
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
    let id = req.body.id;
    let message = await billService.confirmOrder(id);
    return res.status(200).json(message);
}
let handleCancelOrder = async(req, res) => {
    let data = req.body;
    let message = await billService.cancelOrder(data);
    return res.status(200).json(message);
}
let handleConfirmDelivered = async(req, res) => {
    let data = req.body;
    let message = await billService.confirmDelivered(data);
    return res.status(200).json(message);
}
let handleGetAllOrders = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            orders: []
        });
    }
    let orders = await billService.getAllOrders(id);
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
    handlePurchase: handlePurchase,
    handleDisplayOrder: handleDisplayOrder,
    handleDisplayOrderItems: handleDisplayOrderItems,
    handleConfirmOrder: handleConfirmOrder,
    handleCancelOrder: handleCancelOrder,
    handleConfirmDelivered: handleConfirmDelivered,
    handleGetAllOrders: handleGetAllOrders
}