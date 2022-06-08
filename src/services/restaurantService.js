import db from "../models/index";

let getAllRestaurant = async () => {
    return await db.Restaurants.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'openID']
        },     
        include: [
            {
                model: db.OpeningHours,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },                        
                as: 'openData',
            },
        ],
        raw: true, 
        nest: true
    })
}
let getRestaurant = async (id) => {
    let restaurant = await db.Restaurants.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'openID']
        },     
        include: [
            {
                model: db.OpeningHours,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },                        
                as: 'openData',
            },
        ],
        raw: true, 
        nest: true
    })
    if (!restaurant) return "no restaurant found"
    return restaurant
}

module.exports = {
    getAllRestaurant: getAllRestaurant,
    getRestaurant: getRestaurant
}