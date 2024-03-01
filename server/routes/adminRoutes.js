const getAllUsers = require("../controllers/admin/getAllUsers");
const handleUserPromote = require("../controllers/admin/handleUserPromote");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

//Get all users
router.get("/api/users", verifyToken, verifyAdmin, getAllUsers);

//Promote admin role
router.put("/api/user", verifyToken, verifyAdmin, handleUserPromote);


module.exports = router;