import db from "../models/index";
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.Users.findOne({
                    attributes: ['email', 'roleID', 'password'],
                    where: { email: email }, 
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`
                }

                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist. Try another email!`
                resolve(userData);
            }
        }catch(e){
            reject(e);
        }
    })
}
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
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "ALL") {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } 
            else if (userId) {
                users = await db.Users.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },                          
                    include: [
                        {
                            model: db.Allcodes,                            
                            as: 'roleData',
                            where: { type: 'roleID' }
                        },
                        {
                            model: db.Addresses,
                            where: {
                                userID: userId,
                                default: 1
                            }
                        }
                    ],
                    raw: true, 
                    nest: true       
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
// signup function here
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use, please try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    name: data.name,
                    // dob: data.dob,
                    // phoneNumber: data.phoneNumber,
                    // gender: data.gender == 1 ? "female" : "male",
                    roleID: 2
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
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {id: userId}
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `User doesn't exist`
                })
            }
            await db.Users.destroy({
                where: {id: userId}
            })
            resolve({
                errCode: 0,
                errMessage: `User is deleted`
            })
        }catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: {id: data.id},
                //raw: false
            })
            if (user) { 
                
                let currentAddress = await db.Addresses.findOne({
                    where: { userID: data.id, default: 1 }
                })
                await db.Users.update({
                    name: data.name,
                    dob: data.dob,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    avatar: data.avatar,
                }, { where : {id: data.id}});

                if (currentAddress.detail === data.detail && currentAddress.province === data.province
                    && currentAddress.district === data.district && currentAddress.ward === data.ward)  {

                    } else {
                        let checkAddress = await db.Addresses.findOne({
                            where: {
                                userID: data.id,
                                detail: data.detail,
                                province: data.province,
                                district: data.district,
                                ward: data.ward
                            }
                        });
                        await db.Addresses.update({
                            default: 0,
                        }, { where: { default: 1, userID: data.id }})
                        if (checkAddress) {
                            await db.Addresses.update({
                                default: 1,                                
                            }, { where: { id: checkAddress.id }})
                            await db.Users.update({
                                address: checkAddress.id,                                
                            }, { where: { id: data.id }})
                        }
                        else {
                            let newAddress = await db.Addresses.create({
                                userID: data.id,
                                detail: data.detail,
                                province: data.province,
                                district: data.district,
                                ward: data.ward,
                                default: 1
                            })                            
                            await db.Users.update({
                                address: newAddress.id,                                
                            }, { where: { id: data.id }})
                        }
                    }
                resolve({
                    errCode: 0,
                    errMessage: 'Update user succeeded!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                });
            }
        } catch (e) { 
            reject(e);
        }
    })
}
let getAllcodeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allcode = await db.Allcodes.findAll();
            res.errCode = 0;
            res.data = allcode;
            resolve(res);
        } catch (e) {
            reject(e);
        }
    })
}
let changePassword = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: {id: data.id}
            })
            if (user) { 
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.update({
                    password: hashPasswordFromBcrypt
                }, { where : {id: data.id}});
                resolve({
                    errCode: 0,
                    errMessage: 'Change password succeeded!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllcodeService: getAllcodeService,
    changePassword: changePassword,
}