const userCollection = require("../model/userModel");

require("dotenv").config();


const verifyAdmin = async (req, res, next) => {

    //Find the user
    const user = await userCollection.findOne({ email: req.user });

    if (!user) {
        return res.status(403).send({ message: "forbidden" });
    }

    if (user.role !== "admin") {
        return res.status(403).send({ message: "forbidden" });
    }

    next();
}



module.exports = verifyAdmin;