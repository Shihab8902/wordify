require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "unauthorized" });
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (error, encoded) => {
            if (error) {
                return res.status(401).send({ message: "unauthorized" });
            }

            req.user = encoded.user;
            next();
        })


    }
    catch (error) {
        console.log(error);
    }
}


module.exports = verifyToken;