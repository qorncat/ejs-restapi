const router = require("express").Router();
const {ensureAuthenticated}=require("../config/auth");
const dashboardController = require("../controllers/dashboardController");


//Welcome Page
router.get("/" ,dashboardController.startedPage);

//Dashboard
router.get("/dashboard", ensureAuthenticated, dashboardController.getDashboardPage);

module.exports=router;