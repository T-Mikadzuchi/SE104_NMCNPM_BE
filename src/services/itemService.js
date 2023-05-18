import db, { sequelize } from "../models/index";
import { Op, QueryTypes } from "sequelize";

let searchItem = (itemSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      if (itemSearch) {
        items = await db.Items.findAll({
          where: {
            itemName: sequelize.where(
              sequelize.fn("LOWER", sequelize.col("itemName")),
              "LIKE",
              "%" + itemSearch.toLowerCase() + "%"
            ),
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "typeData",
              where: { type: "type" },
              attributes: ["value"],
            },
            {
              model: db.Allcodes,
              as: "availableData",
              where: { type: "available" },
              attributes: ["value"],
            },
            {
              model: db.Allcodes,
              as: "featuredData",
              where: { type: "featured" },
              attributes: ["value"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      var m = new Date();
      var dateString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);
      let date = new Date(dateString);
      let promotion = 0;
      let promotionCheck = null;
      let promotions = await db.Promotions.findAll();
      for await (let promo of promotions) {
        if (date >= promo.begin && date <= promo.end) {
          promotionCheck = promo;
          break;
        }
      }

      if (promotionCheck) promotion = promotionCheck.value;
      let itemList = [];
      for await (let item of items) {
        item.price = Number(item.price.toFixed(2));
        item.pricePromo = Number((item.price * (1 - promotion)).toFixed(2));
        itemList.push({
          item,
        });
      }
      resolve(items);
    } catch {
      reject(e);
    }
  });
};

let updateItem = (uid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const admin = await db.Users.findOne({
        where: {
          id: uid,
          roleID: 0,
        },
      });
      if (!admin)
        resolve({
          errCode: 1,
          errMessage: "You don't have permission to access",
        });
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let item = await db.Items.findOne({
        where: { id: data.id },
      });
      if (item) {
        await db.Items.update(
          {
            itemName: data.itemName,
            type: data.type,
            price: data.price,
            itemImage: data.itemImage,
            available: data.available,
            calories: data.calories,
            featured: data.featured,
          },
          { where: { id: data.id } }
        );
        resolve({
          errCode: 0,
          errMessage: "Item updated successfully!",
        });
      } else {
        resolve({
          errCode: 3,
          errMessage: "Item's not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllItem = (itemID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      if (itemID === "ALL") {
        items = await db.Items.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "typeData",
              where: { type: "type" },
              attributes: ["value"],
            },
            {
              model: db.Allcodes,
              as: "availableData",
              where: { type: "available" },
              attributes: ["value"],
            },
            {
              model: db.Allcodes,
              as: "featuredData",
              where: { type: "featured" },
              attributes: ["value"],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (itemID) {
        items = await db.Items.findOne({
          where: { id: itemID },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "typeData",
              where: { type: "type" },
            },
            {
              model: db.Allcodes,
              as: "availableData",
              where: { type: "available" },
            },
            {
              model: db.Allcodes,
              as: "featuredData",
              where: { type: "featured" },
            },
          ],
          raw: true,
          nest: true,
        });
      }
      var m = new Date();
      var dateString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);
      let date = new Date(dateString);
      let promotion = 0;
      let promotionCheck = null;
      let promotions = await db.Promotions.findAll();
      for await (let promo of promotions) {
        if (date >= promo.begin && date <= promo.end) {
          promotionCheck = promo;
          break;
        }
      }

      if (promotionCheck) promotion = promotionCheck.value;
      let itemList = [];
      for await (let item of items) {
        item.price = Number(item.price.toFixed(2));
        item.pricePromo = Number((item.price * (1 - promotion)).toFixed(2));
        itemList.push({
          item,
        });
      }
      resolve(items);
    } catch (e) {
      reject(e);
    }
  });
};

let getItemSortByType = (data) => {
  if (!data.type)
    return {
      errCode: 1,
      errMessage: "Missing required parameter",
    };
  let items = db.Items.findAll({
    where: { type: data.type },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Allcodes,
        as: "typeData",
        where: { type: "type" },
        attributes: ["value"],
      },
      {
        model: db.Allcodes,
        as: "availableData",
        where: { type: "available" },
        attributes: ["value"],
      },
      {
        model: db.Allcodes,
        as: "featuredData",
        where: { type: "featured" },
        attributes: ["value"],
      },
    ],
    raw: true,
    nest: true,
  });
  return items;
};

let addNewItem = async (uid, data) => {
  try {
    const admin = await db.Users.findOne({
      where: {
        id: uid,
        roleID: 0,
      },
    });
    if (!admin)
      return {
        errCode: 1,
        errMessage: "You don't have permission to access",
      };
    if (
      !data.itemName ||
      (!data.type && (data.type < 0 || data.type > 6)) ||
      !data.itemImage ||
      !data.price ||
      !data.calories ||
      (data.featured !== 0 && data.featured !== 1)
    ) {
      return {
        errCode: 2,
        errMessage: "Missing required parameters!",
      };
    }
    let checkItem = await db.Items.findAll({
      where: {
        itemName: data.itemName,
        type: data.type,
        price: data.price,
        calories: data.calories,
        featured: data.featured,
      },
    });
    if (checkItem.length != 0) {
      return {
        errCode: 3,
        errMessage: "Item exist!",
      };
    }
    let newItem = await db.Items.create({
      itemName: data.itemName,
      type: data.type,
      itemImage: data.itemImage,
      price: data.price,
      calories: data.calories,
      featured: data.featured,
      available: 1,
    });

    return {
      errCode: 0,
      errMessage: "Item added successfully!",
      newItem,
    };
  } catch (e) {
    reject(e);
  }
};
let getFeaturedItem = async () => {
  let items = await db.Items.findAll({
    where: { featured: 1 },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Allcodes,
        as: "typeData",
        where: { type: "type" },
        attributes: ["value"],
      },
      {
        model: db.Allcodes,
        as: "availableData",
        where: { type: "available" },
        attributes: ["value"],
      },
      {
        model: db.Allcodes,
        as: "featuredData",
        where: { type: "featured" },
        attributes: ["value"],
      },
    ],
    raw: true,
    nest: true,
  });
  var m = new Date();
  var dateString =
    m.getFullYear() +
    "/" +
    ("0" + (m.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getDate()).slice(-2) +
    " " +
    ("0" + m.getHours()).slice(-2) +
    ":" +
    ("0" + m.getMinutes()).slice(-2) +
    ":" +
    ("0" + m.getSeconds()).slice(-2);
  let date = new Date(dateString);
  let promotion = 0;
  let promotionCheck = null;
  let promotions = await db.Promotions.findAll();
  for await (let promo of promotions) {
    if (date >= promo.begin && date <= promo.end) {
      promotionCheck = promo;
      break;
    }
  }

  if (promotionCheck) promotion = promotionCheck.value;
  let itemList = [];
  for await (let item of items) {
    item.price = Number(item.price.toFixed(2));
    itemList.push({
      item,
    });
  }
  return items;
};
let deleteItem = async (uid, id) => {
  try {
    const admin = await db.Users.findOne({
      where: {
        id: uid,
        roleID: 0,
      },
    });
    if (!admin)
      return {
        errCode: 1,
        errMessage: "You don't have permission to access",
      };
    if (!id) {
      return {
        errCode: 2,
        errMessage: "Missing required parameters",
      };
    }
    let item = await db.Items.findOne({
      where: { id: id },
    });
    if (item) {
      await db.Items.update(
        {
          available: 0,
        },
        { where: { id: id } }
      );
      return {
        errCode: 0,
        errMessage: "Item deleted from client successfully!",
      };
    } else {
      return {
        errCode: 3,
        errMessage: "Item's not found!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  searchItem: searchItem,
  updateItem: updateItem,
  getAllItem: getAllItem,
  getItemSortByType: getItemSortByType,
  addNewItem: addNewItem,
  getFeaturedItem: getFeaturedItem,
  deleteItem: deleteItem,
};
