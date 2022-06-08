import restaurantService from "../services/restaurantService"

let handleGetAllRestaurant = async(req, res) => {
    let restaurants = await restaurantService.getAllRestaurant();
    console.log(restaurants);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        restaurants
    });
}
let handleGetRestaurant = async(req, res) => {
    let id = req.query.id;
    if (!id) return "Missing required parameter"
    let restaurants = await restaurantService.getRestaurant(id);
    console.log(restaurants);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        restaurants
    });
}

module.exports = {
    handleGetAllRestaurant: handleGetAllRestaurant,
    handleGetRestaurant: handleGetRestaurant
}