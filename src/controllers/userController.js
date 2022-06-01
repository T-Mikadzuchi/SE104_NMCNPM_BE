import userService from "../services/userService"
import middleware from '../middleware'
import admin from '../config/firebase-config'

let extractUID = async (idToken) => {
    try {
        const decodeValue = await admin.auth().verifyIdToken(idToken);
        if (decodeValue) {
            console.log(decodeValue)
            return decodeValue.uid;
        }
        return res.json({ message: 'Unauthorize' });
    } catch (error) {
        return res.json({ message: 'Internal error' })
    }
}
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
} 
let handleGetAllUsers = async(req, res) => {
    let idToken = req.headers.authorization;
    let uid = extractUID(idToken);

    if (!uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            users: []
        });
    }
    let users = await userService.getAllUsers(uid);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    });
}
let handleCreateNewUser = async (req, res) => {
    console.log(req.headers);
    let idToken = req.headers.authorization;
    console.log(idToken);
    let uid = extractUID(idToken);
    let message = await userService.createNewUser(uid, req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllcodeService();
        
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }
}
let handleChangePassword = async (req, res) => {
    let data = req.body;
    let message = await userService.changePassword(data);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllcode: getAllcode,
    handleChangePassword: handleChangePassword,
}