import addressService from '../services/addressService'

let handleGetAddress = async (req, res) => {
    let id = req.query.userId;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            addresses: []
        });
    }
    let addresses = await addressService.getAllAddress(id);
    console.log(addresses);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        addresses
    });
}

let handleAddAddress = async (req, res) => {
    let message = await addressService.addNewAddress(req.body);
    console.log(message);
    return res.status(200).json(message);
}


module.exports = {
    handleGetAddress: handleGetAddress,
    handleAddAddress: handleAddAddress
}