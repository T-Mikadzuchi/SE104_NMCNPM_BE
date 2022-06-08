import db, { sequelize } from "../models/index";

let getTodayReports = async(uid) => {
    const checkRole = await db.Users.findOne({
        where: { id: uid }
    })
    if (!checkRole) return "no user"
    if (checkRole.roleID != 0) return "You don't have permission to access"

    let date = new Date(dateString)
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
        }
    })
    if (!dailyRpCheck) 
        dailyRpCheck = {
            message: "no statistic today"
        }
    let salesRpCheck = await db.SalesReports.findOne({
        where: {
            year: today.getFullYear(),
            month: today.getMonth() + 1
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

module.exports = {
    getTodayReports: getTodayReports
}