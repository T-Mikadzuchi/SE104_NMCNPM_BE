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
module.exports = {
    getAllAddress: getAllAddress

}