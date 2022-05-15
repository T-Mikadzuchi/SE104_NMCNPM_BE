import staffService from "../services/staffService"

let handleAddNewStaff = async (req, res) => {
    let message = await staffService.addNewStaff(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleUpdateStaffStatus = async(req, res) => {
    let data = req.body;
    let message = await staffService.updateStaffStatus(data);
    return res.status(200).json(message);
}

let handleGetStaff = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
            staffs: []
        });
    }
    let staffs = await staffService.getAllStaff(id);
    console.log(staffs);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        staffs
    });
}

module.exports = {
    handleAddNewStaff: handleAddNewStaff,
    handleUpdateStaffStatus: handleUpdateStaffStatus,
    handleGetStaff: handleGetStaff
}