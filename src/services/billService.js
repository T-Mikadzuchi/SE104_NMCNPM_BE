import db from "../models/index";

let createBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.userID }
            })
            let checkBillExist = await db.Bills.findOne({
                where: {
                    userID: user.id,
                    billstatus: 0
                }
            })
            if (checkBillExist) {
                resolve()
            } else {
                
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createBill: createBill,
}