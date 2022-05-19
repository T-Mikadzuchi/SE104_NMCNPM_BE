import db from "../models/index";

let getAllRestaurant = (restaurantId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let restaurants = '';
            if (restaurantId === "ALL") {
                restaurants = await db.Restaurants.findAll({
                    include: [
                        {
                            model: db.OpeningHours,                            
                            as: 'openData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                    ],
                    raw: true, 
                    nest: true
                })
            } 
            else if (restaurantId) {
                restaurants = await db.Restaurants.findOne({
                    where: { id: restaurantId },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },                          
                    include: [
                        {
                            model: db.OpeningHours,                            
                            as: 'openData',
                        },
                    ],
                    raw: true, 
                    nest: true       
                })
            }
            resolve(restaurants)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllRestaurant: getAllRestaurant
}