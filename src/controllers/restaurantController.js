import restaurantService from "../services/restaurantService"

let handleGetRestaurant = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            restaurants: []
        });
    }
    let restaurants = await restaurantService.getAllRestaurant(id);
    console.log(restaurants);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        restaurants
    });
}

module.exports = {
    handleGetRestaurant: handleGetRestaurant
}