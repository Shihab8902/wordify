const handleImageUpload = require("../controllers/uploads/handleImageUpload");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();


//Upload image
router.post("/api/upload/image", verifyToken, handleImageUpload);


module.exports = router;