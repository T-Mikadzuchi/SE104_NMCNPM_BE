import db, { sequelize } from "../models/index";

let getAllAddress = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let addresses = '';
            addresses = await db.Addresses.findAll({
                where: {
                    userID: userId,
                    default: 0
                },
                include: [
                    {
                        model: db.Users,
                        attributes: ['id', 'email', 'name'],
                    },
                ],
                raw: true,
                nest: true
            })
            resolve(addresses)
        } catch (e) {
            reject(e);
        }
    })
}

let addNewAddress = (uid, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!uid || !data.detail || !data.province || !data.district || !data.ward) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }
            let checkAddress = await db.Addresses.findOne({
                where: {
                    userID: uid,
                    name: data.name,
                    phone: data.phone,
                    detail: data.detail,
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    default: 0
                }
            });
            if (checkAddress) {
                resolve({
                    errCode: 1,
                    errMessage: 'Existed!'
                });
            }
            else {
                await db.Addresses.create({
                    userID: uid,
                    name: data.name,
                    phone: data.phone,
                    detail: data.detail,
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    default: 0
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Add address success!'
            });
        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteAddress = async(id, uid) => {
    try {
        let checkAddress = await db.Addresses.findOne({
            where: {
                id: id,
                userID: uid
            }
        })
        if (!checkAddress) {
            return {
                errCode: 1,
                errMessage: "Address not exists or not belong to this user"
            }
        } 
        if (checkAddress.default == 1)             
        return {
            errCode: 2,
            errMessage: "Can't delete default address"
        }
        await db.Addresses.destroy({
            where: {id: id}
        })
        resolve({
            errCode: 0,
            errMessage: `Address is deleted`
        })
    } catch (e) {
        console.log(e)
    }
}
let updateAddress = async(id, uid, data) => {
    try {
        let checkAddress = await db.Addresses.findOne({
            where: {
                id: id,
                userID: uid
            }
        })
        if (!checkAddress) {
            return {
                errCode: 1,
                errMessage: "Address not exists or not belong to this user"
            }
        }
        await db.Addresses.update({
            name: data.name,
            phone: data.phone,
            detail: data.detail,
            province: data.province,
            district: data.district,
            ward: data.ward,
        }, { where: {id: id} })
        resolve({
            errCode: 0,
            errMessage: `Address is deleted`
        })
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    getAllAddress: getAllAddress,
    addNewAddress: addNewAddress,
    deleteAddress: deleteAddress,
    updateAddress: updateAddress
}