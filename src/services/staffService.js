import db from "../models/index";

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

let addNewStaff = (uid, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRole = await db.Users.findOne({
                where: { id: uid }
            })
            if (!checkRole) resolve({
                errCode: 3,
                errMessage: 'No user'
            })
            if (checkRole.roleID != 0) resolve({
                errCode: 4,
                errMessage: "You don't have permission to access"
            }) 
            let check = await checkUserEmail(data.email);
            if (check === false) {
                resolve({
                    errCode: 1,
                    errMessage: "User's not exist"
                })
            } else {
                let user = await db.Users.findOne({
                    where: { email: data.email }
                })
                let staff = await db.Staffs.findOne({
                    where: { userID: user.id }
                })
                if (staff) resolve({
                    errCode: 2,
                    errMessage: "Staff exists"
                })
                await db.Staffs.create({
                    userID: user.id,
                    restaurantID: data.restaurantID,
                    workingDay: Date.now(),
                    staffStatus: 1
                })
                await db.Users.update({
                    roleID: 1
                }, { where: { id: user.id }})
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

let updateStaffStatus = (uid, id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRole = await db.Users.findOne({
                where: { id: uid }
            })
            if (!checkRole) resolve({
                errCode: 3,
                errMessage: 'No user'
            })
            if (checkRole.roleID != 0) resolve({
                errCode: 4,
                errMessage: "You don't have permission to access"
            }) 
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let staff = await db.Staffs.findOne({
                where: { id: id }
            })
            if (staff) {
                await db.Staffs.update({
                    staffStatus: data.staffStatus
                }, { where: { id: id }})
                if (data.staffStatus == 0) {
                    await db.Users.update({
                        roleID: 2
                    }, { where: { id: staff.userID }})
                }                
                resolve({
                    errCode: 0,
                    errMessage: "Status updated successfully!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Staff's not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllStaff = (uid, staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRole = await db.Users.findOne({
                where: { id: uid }
            })
            if (!checkRole) resolve({
                errCode: 3,
                errMessage: 'No user'
            })
            if (checkRole.roleID != 0) resolve({
                errCode: 4,
                errMessage: "You don't have permission to access"
            }) 
            let staffs = '';
            if (staffId === "ALL") {
                staffs = await db.Staffs.findAll({
                    include: [
                        {
                            model: db.Users,    
                            attribute: ['email', 'name']                            
                        },
                    ],
                    include: [
                        {
                            model: db.Restaurants,     
                            attribute: ['resAddress']                           
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
                            attribute: ['email', 'name']                            
                        },
                    ],
                    include: [
                        {
                            model: db.Restaurants,     
                            attribute: ['resAddress']                           
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

let changeRole = async (uid, id, data) => {
    const checkRole = await db.Users.findOne({
        where: { id: uid }
    })
    if (!checkRole) return "no user"
    if (checkRole.roleID != 0) return "You don't have permission to access"
    if (!id || !uid || !data.roleID) return "Missing required parameter"
    if (uid == id) return "You can't demote yourself"
    const staff = await db.Staffs.findOne({
        where: { userID: id }
    })
    if (!staff) return "no staff"
    await db.Users.update({
        roleID: data.roleID
    }, { where: { id: staff.userID } })
    return "Change role succeeded"
}

module.exports = {
    addNewStaff: addNewStaff,
    updateStaffStatus: updateStaffStatus,
    getAllStaff: getAllStaff,
    changeRole: changeRole
}