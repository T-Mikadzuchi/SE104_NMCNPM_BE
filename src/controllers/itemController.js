import itemService from '../services/itemService'
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

let handleSearchItem = async (req, res) => {
    let itemSearch = req.query.search;
    if (!itemSearch) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            item: []
        });
    }
    let items = await itemService.searchItem(itemSearch);
    console.log(items);
    return res.status(200).json({
        errCode: 0,
        errMessage: "Search result:",
        items
    });
}

let handleUpdateItem = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let data = req.body;
    let message = await itemService.updateItem(uid, data);
    return res.status(200).json(message);
}

let handleGetItem = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            items: []
        });
    }
    let items = await itemService.getAllItem(id);
    console.log(items);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        items
    });
}

let handleAddItem = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let message = await itemService.addNewItem(uid, req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetItemSortByType = async (req, res) => {
    let data = req.body
    let items = await itemService.getItemSortByType(data);
    console.log(items);
    return res.status(200).json({
        items
    });
}
let handleGetFeaturedItem = async (req, res) => {
    let items = await itemService.getFeaturedItem();
    console.log(items);
    return res.status(200).json({
        items
    });
}

let handleDeleteItem = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let id = req.query.id;
    let message = await itemService.deleteItem(uid, id);
    return res.status(200).json(message);
}

module.exports = {
    handleSearchItem: handleSearchItem,
    handleUpdateItem: handleUpdateItem,
    handleGetItem: handleGetItem,
    handleGetItemSortByType: handleGetItemSortByType,
    handleAddItem: handleAddItem,
    handleGetFeaturedItem: handleGetFeaturedItem,
    handleDeleteItem: handleDeleteItem
}