import staffService from "../services/staffService"
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
let handleAddNewStaff = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let message = await staffService.addNewStaff(uid, req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleUpdateStaffStatus = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let id = req.query.id;
    let message = await staffService.updateStaffStatus(uid, id, req.body);
    return res.status(200).json(message);
}

let handleGetStaff = async(req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            staffs: []
        });
    }
    let staffs = await staffService.getAllStaff(uid, id);
    console.log(staffs);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        staffs
    });
}
let handleChangeRole = async (req, res) => {
    let idToken = req.headers.authorization.split(' ')[1];
    let uid = await extractUID(idToken);

    let id = req.query.id;
    let message = await staffService.changeRole(uid, id, req.body);
    return res.status(200).json(message);
}

module.exports = {
    handleAddNewStaff: handleAddNewStaff,
    handleUpdateStaffStatus: handleUpdateStaffStatus,
    handleGetStaff: handleGetStaff,
    handleChangeRole: handleChangeRole
}