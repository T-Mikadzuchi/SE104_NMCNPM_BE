import db, { Sequelize } from "../models/index";
import { Op } from 'sequelize';

let getTodayReports = async(uid) => {
    const checkRole = await db.Users.findOne({
        where: { id: uid }
    })
    if (!checkRole) return "no user"
    if (checkRole.roleID == 2) return "You don't have permission to access"

    let date = new Date()
    let today = date.getFullYear() + "-" +
    ("0" + (date.getMonth()+1)).slice(-2) + "-" +
    ("0" + date.getDate()).slice(-2) 
    let m = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let tmr = m.getFullYear() + "-" +
    ("0" + (m.getMonth()+1)).slice(-2) + "-" +
    ("0" + m.getDate()).slice(-2) 
    console.log(today + '\n' + tmr)
    let dailyRpCheck = await db.DailyReports.findOne({
        where: {
            date: {
                [Op.gte]: new Date(today),
                [Op.lt]: new Date(tmr)
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    if (!dailyRpCheck) 
        dailyRpCheck = {
            message: "no statistic today"
        }
    let td = new Date(today);
    let salesRpCheck = await db.SalesReports.findOne({
        where: {
            year: td.getFullYear(),
            month: td.getMonth() + 1
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    if (!salesRpCheck)
        salesRpCheck = {
            message: "no statistic this month"
        }
    return {
        dailyReport: dailyRpCheck,
        monthlyReport: salesRpCheck
    }
}
let getAllDailyReports = async(uid, data) => {
    const checkRole = await db.Users.findOne({
        where: { id: uid }
    })
    if (!checkRole) return "no user"
    if (checkRole.roleID == 2) return "You don't have permission to access"
    if (!data.month || !data.year) return "Missing required parameter"
    let dailyReport = await db.DailyReports.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), data.month),
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), data.year),
            ],
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    let monthlyReport = await db.SalesReports.findOne({
        where: {
            year: data.year,
            month: data.month
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    if (!monthlyReport) return "no statistic this period"
    return {
        dailyReport,
        monthlyReport
    }
}
let getAllMonthlyReports = async (uid, data) => {
    const checkRole = await db.Users.findOne({
        where: { id: uid }
    })
    if (!checkRole) return "no user"
    if (checkRole.roleID == 2) return "You don't have permission to access"
    if (!data.year) return "Missing required parameter"
    return await db.SalesReports.findAll({
        where: {
            year: data.year,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
}

module.exports = {
    getTodayReports: getTodayReports,
    getAllDailyReports: getAllDailyReports,
    getAllMonthlyReports: getAllMonthlyReports
}
