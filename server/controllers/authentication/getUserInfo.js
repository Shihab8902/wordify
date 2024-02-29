require("dotenv").config();

const jwt = require("jsonwebtoken");
const userCollection = require("../../model/userModel");

const getUserInfo = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.send({ message: "No user found!" });

        jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
            if (error) return res.send({ message: "Something went wrong!" });
            //Find user and return user info;
            const result = await userCollection.findOne({ email: user });
            res.send({ name: result.name, email: result.email, role: result.role });
        });

    }
    catch (error) {
        next(error.message);
    }
}


module.exports = getUserInfo;