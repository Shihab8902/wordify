const getUserInfo = require("../controllers/authentication/getUserInfo");
const handleRegister = require("../controllers/authentication/handleRegister");
const handleUserLogin = require("../controllers/authentication/handleUserLogin");

const router = require("express").Router();

//Get a specific user info 
router.post("/api/user", getUserInfo);

//Create a new user
router.post("/api/register", handleRegister);

//Login user
router.post("/api/login", handleUserLogin);

module.exports = router;