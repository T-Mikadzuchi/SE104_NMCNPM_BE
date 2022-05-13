import staffService from "../services/staffService"

let handleAddNewStaff = async (req, res) => {
    let message = await staffService.addNewStaff(req.body);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleAddNewStaff: handleAddNewStaff,
}