const express = require('express');

const userController = require("../controllers/userController")

const router = express.Router();

router.post("/add-user",userController.addNewUser)

router.post("/user-login",userController.userLogin)

router.post("/add-userDetails",userController.addUserIdentity)

router.post("/add-getUserIdentity",userController.getUserIdentity)

router.post("/createProfile",userController.updateRegiterProfile)

router.post("/addNewService",userController.addNewService)

router.post("/addcard",userController.addcard)

router.post("/userRegisterInfo",userController.getUserRegisterInfo)

router.post("/userCardInfo",userController.getUserCardInfo)

router.post("/docToVerify",userController.addDocToVerify)

router.get("/getAllUserData",userController.getAllUserData)

router.get("/getAllUserDetailedData",userController.getAllUserDetailedData)

router.post("/userAllInfo",userController.getUserAllInfo)

module.exports = router;