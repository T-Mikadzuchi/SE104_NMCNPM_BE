import promotionService from "../services/promotionService"
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

let handleAddPromotion = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let message = await promotionService.addNewPromotion(uid, req.body);
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