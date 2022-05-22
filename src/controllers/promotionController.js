import promotionService from "../services/promotionService"

let handleAddPromotion = async(req, res) => {
    let message = await promotionService.addNewPromotion(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetPromotion = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            promotions: []
        });
    }
    let promotions = await promotionService.getAllPromotion(id);
    console.log(promotions);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        promotions
    });
}
let handleGetCurrentPromotion = async(req, res) => {
    let promotions = await promotionService.getCurrentPromotion();
    console.log(promotions);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        promotions
    });
}

module.exports = {
    handleAddPromotion: handleAddPromotion,
    handleGetPromotion: handleGetPromotion,
    handleGetCurrentPromotion: handleGetCurrentPromotion
}