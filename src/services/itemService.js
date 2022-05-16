import db, { sequelize } from "../models/index";

let searchItem = (itemSearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (itemSearch) {
                items = await db.Items.findAll({
                    where: {
                        itemName: sequelize.where(sequelize.fn('LOWER', sequelize.col('itemName')),
                         'LIKE', '%' + itemSearch.toLowerCase() + '%')
                    },
                    include: [
                        {
                            model: db.Allcodes,                            
                            as: 'typeData',
                            where: { type: 'type' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'availableData',
                            where: { type: 'available' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'featuredData',
                            where: { type: 'featured' }
                        },
                    ],
                    raw: true, 
                    nest: true
                })
            }
            resolve(items)
        } catch {
            reject(e)
        }
    })
}

let updateItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let item = await db.Items.findOne({
                where: { id: data.id }
            })
            if (item) {
                await db.Items.update({
                    itemName: data.itemName,
                    price: data.price,
                    itemImage: data.itemImage,
                    available: data.available,
                    calories: data.calories,
                    featured: data.featured
                }, { where: { id: data.id }})
                resolve({
                    errCode: 0,
                    errMessage: "Item updated successfully!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Item's not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllItem = (itemId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (itemId === "ALL") {
                items = await db.Items.findAll({
                    include: [
                        {
                            model: db.Allcodes,                            
                            as: 'typeData',
                            where: { type: 'type' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'availableData',
                            where: { type: 'available' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'featuredData',
                            where: { type: 'featured' }
                        },
                    ],
                    raw: true, 
                    nest: true
                })
            } 
            else if (itemId) {
                items = await db.Items.findOne({
                    where: { id: itemId },
                                              
                    include: [
                        {
                            model: db.Allcodes,                            
                            as: 'typeData',
                            where: { type: 'type' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'availableData',
                            where: { type: 'available' }
                        },
                        {
                            model: db.Allcodes,                            
                            as: 'featuredData',
                            where: { type: 'featured' }
                        },
                    ],
                    raw: true, 
                    nest: true       
                })
            }
            resolve(items)
        } catch (e) {
            reject(e);
        }
    })
}

let addNewItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.itemName || !data.type || !data.itemImage || !data.price || data.available != 1 || !data.calories || (data.featured != 0 && data.featured != 1)) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }
            let checkItem = await db.Items.findAll({
                where: {
                    
                    itemName: data.itemName,
                    type: data.type,
                    itemImage: data.itemImage,
			        price: data.price, 
                    available: data.available,
			        calories: data.calories,
			        featured: data.featured
                }
            });
            if (checkItem.length !=0) {
                resolve({
                    errCode: 1,
                    errMessage: 'Existed!'
                });
            }
            else {
                let newItem = await db.Items.create({
                    
                    itemName: data.itemName,
                    type: data.type,
                    itemImage: data.itemImage,
			        price: data.price, 
                    available: data.available,
			        calories: data.calories,
			        featured: data.featured
                })                           
            }
            resolve({
                errCode: 0,
                errMessage: 'Item success!'
            });
        }
        catch (e) {
            reject (e);
        }
    })
}

module.exports = {
    searchItem: searchItem,
    updateItem: updateItem,
    getAllItem: getAllItem,
    addNewItem: addNewItem
}