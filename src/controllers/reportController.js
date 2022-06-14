import reportService from '../services/reportService'
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
let handleGetTodayReports = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        });
    }
    let report = await reportService.getTodayReports(uid);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        report
    });
}
let handleGetAllDailyReports = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let data = req.query;
    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        });
    }
    let report = await reportService.getAllDailyReports(uid, data);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        report
    });
}
let handleGetAllMonthlyReports = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let data = req.query;
    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        });
    }
    let report = await reportService.getAllMonthlyReports(uid, data);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        report
    });
}

module.exports = {
    handleGetTodayReports: handleGetTodayReports,
    handleGetAllDailyReports: handleGetAllDailyReports,
    handleGetAllMonthlyReports: handleGetAllMonthlyReports
}