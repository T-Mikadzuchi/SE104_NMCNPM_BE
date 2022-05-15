import db from "../models/index";
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let addNewStaff = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email is already in use, please try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword('user1234');
                let newStaff = await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    name: data.name,
                    roleID: 1
                });
                // var today = new Date();
                await db.Staffs.create({
                    userID: newStaff.id,
                    restaurantID: data.restaurantID,
                    workingday: Date.now(),
                    staffstatus: 1
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        }catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    addNewStaff: addNewStaff,
}