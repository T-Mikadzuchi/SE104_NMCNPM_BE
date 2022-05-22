import db, { sequelize } from "../models/index";

let getAllAddress = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let addresses = '';
            
            addresses = await db.Addresses.findAll({
                where: {
                    userID: userId 
                },
                include: [
                    {
                        model: db.Users,                            
                            
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

let addNewAddress = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userID || !data.detail || !data.province || !data.district || !data.ward) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }
            let checkAddress = await db.Addresses.findOne({
                where: {
                    userID: data.userID,
                    detail: data.detail,
                    province: data.province,
                    district: data.district,
                    ward: data.ward
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
                    userID: data.userID,
                    detail: data.detail,
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    default: 0
                })                            
            }
            resolve({
                errCode: 0,
                errMessage: 'Address success!'
            });
        }
        catch (e) {
            reject (e);
        }
    })
}

module.exports = {
    getAllAddress: getAllAddress,
    addNewAddress: addNewAddress
    
}