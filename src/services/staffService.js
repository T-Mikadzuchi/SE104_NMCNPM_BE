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
                    workingDay: Date.now(),
                    staffStatus: 1
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

let updateStaffStatus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let staff = await db.Staffs.findOne({
                where: { id: data.id }
            })
            if (staff) {
                await db.Staffs.update({
                    staffStatus: data.staffStatus

                }, { where: { id: data.id }})
                resolve({
                    errCode: 0,
                    errMessage: "Status updated successfully!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Status's not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })

}

let getAllStaff = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staffs = '';
            if (staffId === "ALL") {
                staffs = await db.Staffs.findAll({
                    include: [
                        {
                            model: db.Users,                                
                        },
                        
                    ],
                    include: [
                        {
                            model: db.Restaurants,                                
                        },
                        
                    ],
                    raw: true, 
                    nest: true
                })
            } 
            else if (staffId) {
                staffs = await db.Staffs.findOne({
                    where: { id: staffId },
                                              
                    include: [
                        {
                            model: db.Users,                                
                        },
                    ],
                    include: [
                        {
                            model: db.Restaurants,                                
                        },
                        
                    ],
                    raw: true, 
                    nest: true       
                })
            }
            resolve(staffs)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    addNewStaff: addNewStaff,
    updateStaffStatus: updateStaffStatus,
    getAllStaff: getAllStaff
}