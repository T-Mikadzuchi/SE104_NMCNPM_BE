import { Op, QueryTypes } from 'sequelize';
import db, { Sequelize, sequelize } from "../models/index";

let addNewPromotion = async (uid, data) => {
        try {
            const checkRole = await db.Users.findOne({
                where: { id: uid }
            })
            if (!checkRole) return "no user"
            if (checkRole.roleID != 0) return "You don't have permission to access"
            if (!data.promotionName || !data.begin || !data.end || !data.value) {
                return({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }
            if (isNaN(data.begin) || isNaN(data.end))
            return({
                errCode: 3,
                errMessage: "Date invalid"
            })
            if (data.begin >= data.end) 
            return({
                errCode: 4,
                errMessage: "Invalid input, end time must be after begin"
            })
            if (Date.parse(data.begin) <= Date.now()) 
            return({
                errCode: 5,
                errMessage: "Only add future promotion"
            })
            let checkPromotion = await db.Promotions.findAll({
                where: {
                    [Op.or]: {
                        begin: {
                            [Op.between]: [ data.begin, data.end ]
                        },
                        end: {
                            [Op.between]: [data.begin, data.end]
                        }
                    }
                }
            });
            console.log(checkPromotion)
            let newPromotion;
            if (checkPromotion.length !=0) {
                return({
                    errCode: 1,
                    errMessage: 'Promotion exists during the input time!',
                    checkPromotion
                });
            }
            else {
                    newPromotion = await db.Promotions.create({
                    promotionName: data.promotionName,
                    begin: data.begin,
                    end: data.end,
                    value: data.value / 100
                })                      
            return({
                errCode: 0,
                errMessage: 'Promotion success!',
                newPromotion
            });                     
            }
        }
        catch (e) {
            console.log(e);
        }

}
let getAllPromotion = (promotionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let promotions = '';
            if (promotionId === "ALL") {
                promotions = await db.Promotions.findAll({
                    raw: true, 
                    nest: true
                })
            } 
            else if (promotionId) {
                promotions = await db.Promotions.findOne({
                    where: { 
                        id: promotionId 
                    },                          
                    raw: true, 
                    nest: true       
                })
            }
            resolve(promotions)
        } catch (e) {
            reject(e);
        }
    })
}
let getCurrentPromotion = async() => {
    var m = new Date();
    var dateString = m.getFullYear() + "/" +
    ("0" + (m.getMonth()+1)).slice(-2) + "/" +
    ("0" + m.getDate()).slice(-2) + " " +
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + ":" +
    ("0" + m.getSeconds()).slice(-2);
    let date = new Date(dateString)
    let promotion = await db.Promotions.findOne({
        where: {
            [Op.and]: [
                sequelize.where(sequelize.fn('date', sequelize.col('begin')), '<=', date),
                sequelize.where(sequelize.fn('date', sequelize.col('end')), '>=', date)
            ]
        }
    })   
    console.log(promotion)
    return promotion
} 

module.exports = {
    addNewPromotion: addNewPromotion,
    getAllPromotion: getAllPromotion,
    getCurrentPromotion: getCurrentPromotion
}