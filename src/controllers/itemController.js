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

module.exports = {
    handleSearchItem: handleSearchItem,
    handleUpdateItem: handleUpdateItem,
}