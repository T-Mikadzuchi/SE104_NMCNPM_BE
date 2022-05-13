import addressService from '../services/addressService'

let handleGetAddress = async(req, res) => {
    let id = req.body.userId;
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

module.exports = {
    handleGetAddress: handleGetAddress
     
}