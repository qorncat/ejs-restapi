const router = require('express').Router();
const authController = require("../controllers/authController");


router.get("/login", authController.showLoginPage);
router.get("/register",authController.showRegisterPage);
router.post("/register" , authController.postRegister);
router.post("/login",authController.postLogin);
router.get("/logout", authController.getLogout);

module.exports=router;