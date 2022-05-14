import db from "../models/index";

let addNewPromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.promotionName || !data.begin || !data.end || !data.value) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }
            let checkPromotion = await db.Promotions.findAll({
                where: {
                    
                    promotionName: data.promotionName,
                    begin: data.begin,
                    end: data.end,

                    value: data.value
                }
            });
            if (checkPromotion.length !=0) {
                resolve({
                    errCode: 1,
                    errMessage: 'Existed!'
                });
            }
            else {
                let newPromotion = await db.Promotions.create({
                    
                    promotionName: data.promotionName,
                    begin: data.begin,
                    end: data.end,

                    value: data.value

                })                           
            }
            resolve({
                errCode: 0,
                errMessage: 'Promotion success!'
            });
        }
        catch (e) {
            reject (e);
        }
    })
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

module.exports = {
    addNewPromotion: addNewPromotion,
    getAllPromotion: getAllPromotion
    
}