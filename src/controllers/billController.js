import billService from '../services/billService'

let handleCreateBill = async (req, res) => {
    let message = await billService.createBill(req.body);
    return res.status(200).json(message);
}


module.exports = {
    handleCreateBill: handleCreateBill
}