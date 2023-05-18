import addressService from "../services/addressService";
import admin from "../config/firebase-config";

let extractUID = async (idToken) => {
  try {
    let decodeValue = await admin.auth().verifyIdToken(idToken);
    if (decodeValue) {
      console.log(decodeValue);
      return decodeValue.uid;
    }
    console.log("Unauthorize");
    return null;
  } catch (error) {
    console.log("Internal error");
    console.log(error);
    return null;
  }
};
let handleGetAddress = async (req, res) => {
  let idToken = req.headers.authorization.split(" ")[1];
  let uid = await extractUID(idToken);
  if (!uid) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
      addresses: [],
    });
  }
  let addresses = await addressService.getAllAddress(uid);
  console.log(addresses);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    addresses,
  });
};
let handleAddAddress = async (req, res) => {
  let idToken = req.headers.authorization.split(" ")[1];
  let uid = await extractUID(idToken);
  let message = await addressService.addNewAddress(uid, req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleDeleteAddress = async (req, res) => {
  let idToken = req.headers.authorization.split(" ")[1];
  let uid = await extractUID(idToken);
  let id = req.query.id;
  let message = await addressService.deleteAddress(id, uid);
  console.log(message);
  return res.status(200).json(message);
};
let handleUpdateAddress = async (req, res) => {
  let idToken = req.headers.authorization.split(" ")[1];
  let uid = await extractUID(idToken);
  let id = req.query.id;
  let message = await addressService.updateAddress(id, uid, req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAddress: handleGetAddress,
  handleAddAddress: handleAddAddress,
  handleDeleteAddress: handleDeleteAddress,
  handleUpdateAddress: handleUpdateAddress,
};
