import { QueryTypes } from 'sequelize';
import db, { sequelize } from "../models/index";

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
                resolve({
                    errCode: 1,
                    errMessage: 'Bill existed as draft'
                })
            } else {
                // let salesRpCheck = await db.SalesReports.findOne({
                //     where: {
                //         year: Date.now().getFullYear,
                //         month: Date.now().getMonth,
                //     }
                // })
                // if (!salesRpCheck) {
                //     salesRpCheck = await db.SalesReports.create({
                //         year: Date.now().getFullYear,
                //         month: Date.now().getMonth,
                //         totalRevenue: 0,
                //         totalBillCount: 0
                //     })
                // }
                // let dailyRpCheck = await sequelize.query('select date from dailyreports where '
                // + 'year(date) = ' + Date.now().getFullYear() + ' and month(date) = ' + Date.now().getMonth()
                // + 'and day(date) = ' + Date.now().getDate(), { type: QueryTypes.SELECT })
                // if (!dailyRpCheck) {
                //     dailyRpCheck = await db.DailyReports.create({
                //         reportID: salesRpCheck.id,
                //         date: Date.now(),
                //         revenue: 0,
                //         billCount: 0
                //     })
                // }
                let bill = await db.Bills.create({
                    userID: data.userID,
                    restaurantID: data.restaurantID,
                    // dailyRpID: dailyRpCheck.id,
                    date: Date.now(),
                    total: 0,
                    ship: 20000,
                    billstatus: 0,                    
                })
                resolve(bill)
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createBill: createBill,
}