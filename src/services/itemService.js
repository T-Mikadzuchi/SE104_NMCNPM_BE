import db, { sequelize } from "../models/index";
import Op from 'sequelize';

let searchItem = (itemSearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (itemSearch) {
                items = await db.Items.findAll({
                    where: {
                        itemName: sequelize.where(sequelize.fn('LOWER', sequelize.col('itemName')),
                         'LIKE', '%' + itemSearch.toLowerCase() + '%')
                    }
                })
            }
            resolve(items)
        } catch {
            reject(e)
        }
    })
}

module.exports = {
    searchItem: searchItem,
}