import bcrypt from 'bcryptjs'
import db from '../models/index'
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    console.log('data from service')
    console.log(data)
    console.log(hashPasswordFromBcrypt)
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.Users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                name: data.name,
                dob: data.dob,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender: data.gender == 1 ? "female" : "male",
                roleID: parseInt(data.roleID) + 1
            })
            resolve('create new user succeeded')
        } catch (e) {
            console.log(e);
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

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.Users.findAll({ raw: true, });
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {id: userId}, raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise (async(resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {id: data.id}
            })
            if (user) {
                user.name = data.name;
                user.phoneNumber = data.phoneNumber;

                await user.save();

                let allUsers = await db.Users.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch(e) {
            console.log(e);
        }
    });
}

let deleteUserById = (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {id: userId}
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}