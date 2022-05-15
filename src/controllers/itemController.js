import itemService from '../services/itemService'

let handleSearchItem = async(req, res) => {
    let itemSearch = req.body.search;
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

let handleUpdateItem = async(req, res) => {
    let data = req.body;
    let message = await itemService.updateItem(data);
    return res.status(200).json(message);
}

let handleGetItem = async(req, res) => {
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

let handleAddItem = async(req, res) => {
    let message = await itemService.addNewItem(req.body);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleSearchItem: handleSearchItem,
    handleUpdateItem: handleUpdateItem,
    handleGetItem: handleGetItem,
    handleAddItem: handleAddItem
}