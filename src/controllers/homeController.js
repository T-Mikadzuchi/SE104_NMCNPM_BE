import db from '../models/index';
import CRUDservice from "../services/CRUDservice";

let getHomePage = async(req, res) => {
    try {
        let data = await db.Users.findAll();
        return res.render('homepage.ejs', 
        {
            data: JSON.stringify(data)
        });
    }
    catch(e) {
        console.log(e);
    }
}
let getCRUD = async(req, res) => {
        return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    console.log(await CRUDservice.createNewUser(req.body)); 
    return res.send('post crud from server');
}
let displayGetCRUD = async(req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log("---------------------");
    console.log(data);
    console.log("---------------------");
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);   
        console.log(userData);
        return res.render("editCRUD.ejs", {
            user: userData
        });
    }
    else {
        return res.send('User not found!');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete user succeeded')
    } else {
        return res.send('user not found')
    }
}

module.exports = {
    getHomePage: getHomePage, 
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}