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
let checkUserEmail = async(userEmail) => {
    try {
        let user = await db.Users.findOne({
            where: {email: userEmail}
        })
        if (user) {
            return(true)
        } else {
            return(false)
        }
    } catch (e) {
        console.log(e);
    }
}
let getUser = async (userId) => {
    try {
        let users = await db.Users.findOne({
            where: { id: userId }
        })
        if (!users) return "no user"

        users = await db.Users.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'address', 'roleID']
            },                          
            include: [
                {
                    model: db.Allcodes,                            
                    attributes: ['value'], 
                    as: 'roleData',
                    where: { type: 'roleID' }
                },
                {
                    model: db.Addresses,
                    attributes: ['detail', 'province', 'district', 'ward'],
                    where: {
                        default: 1
                    }
                }
            ],  
            raw: true, 
            nest: true       
        })
        return(users)
    } catch (e) {
        console.log(e);
    }

}
let createNewUser = async (uid, data) => {
    try {
    let checkUid = await db.Users.findOne({
        where: { id: uid }
    })
    let check = await checkUserEmail(data.email);
    if (check === true) {
        return ({
            errCode: 1,
            errMessage: 'Your email is already in use, please try another email!'
        })
    } else if (checkUid) {
        return ({
            errCode: 2,
            errMessage: "User's already exists"
        })
    } else {
        let user = await db.Users.create({
            id: uid,
            email: data.email,
            name: data.name,
            roleID: 2
        })
        await db.Addresses.create({
            userID: user.id,
            default: 1
        })
        return ({
            errCode: 0,
            errMessage: 'OK'
        })
    }
    }catch (e) {
        console.log(e);
    }

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
let updateUserData = (uid, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // if (!data.id) {
            //     resolve({
            //         errCode: 2,
            //         errMessage: 'Missing required parameters'
            //     })
            // }
            let user = await db.Users.findOne({
                where: {id: uid},
                //raw: false
            })
            if (user) { 
                await db.Users.update({
                    name: data.name,
                    dob: data.dob,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    avatar: data.avatar,
                }, { where : {id: uid}});
                let checkAddress = await db.Addresses.findOne({
                    where: {
                        userID: uid,
                        default: 1
                    }
                });
                if (checkAddress) {
                    await db.Addresses.update({
                        name: data.name,
                        phone: data.phoneNumber,
                        detail: data.detail,
                        province: data.province,
                        district: data.district,
                        ward: data.ward,                    
                    }, { where: { id: checkAddress.id }})
                    await db.Users.update({
                        address: checkAddress.id,                                
                    }, { where: { id: uid }})
                }
                else {
                    let newAddress = await db.Addresses.create({
                        userID: uid,
                        detail: data.detail,
                        province: data.province,
                        district: data.district,
                        ward: data.ward,
                        default: 1
                    })                            
                    await db.Users.update({
                        address: newAddress.id,                                
                    }, { where: { id: uid }})
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
let getAllUsers = async(uid) => {
    const user = await db.Users.findOne({
        where: { id: uid }
    })
    if (!user) return "no user"
    if (user.roleID != 0) {
        return "You don't have permission to access"
    } 
    let users = db.Users.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'address', 'roleID']
        },                          
        include: [
            {
                model: db.Allcodes,                            
                attributes: ['value'], 
                as: 'roleData',
                where: { type: 'roleID' }
            },
            {
                model: db.Addresses,
                attributes: ['detail', 'province', 'district', 'ward'],
                where: {
                    default: 1
                }
            }
        ],  
        raw: true, 
        nest: true  
    })
    return users;
}
let searchUsersByEmail = async(uid, search) => {
    const user = await db.Users.findOne({
        where: { id: uid }
    })
    if (!user) return "no user"
    if (user.roleID != 0) {
        return "You don't have permission to access"
    } 
    let users = db.Users.findAll({
        where: {
            email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')),
             'LIKE', '%' + search.toLowerCase() + '%')
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'address']
        },                          
        include: [
            {
                model: db.Allcodes,                            
                attributes: ['value'], 
                as: 'roleData',
                where: { type: 'roleID' }
            },
            {
                model: db.Addresses,
                attributes: ['detail', 'province', 'district', 'ward'],
                where: {
                    default: 1
                }
            }
        ],  
        raw: true, 
        nest: true  
    })
    return users;
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getUser: getUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllcodeService: getAllcodeService,
    changePassword: changePassword,
    getAllUsers: getAllUsers,
    searchUsersByEmail: searchUsersByEmail
}