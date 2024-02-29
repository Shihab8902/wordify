const userCollection = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Find the possible user based on email
        const user = await userCollection.findOne({ email: email });

        //Check for user existence
        if (!user) return res.send({ message: "no user" });

        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, (error, result) => {

            if (!result) return res.send({ message: "Invalid!" });

            if (result) {
                const token = jwt.sign(user.email, process.env.TOKEN_SECRET);
                const userInfo = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

                res.send({ token, userInfo });
            }
        })

    }
    catch (error) {
        next(error.message);
    }
}


module.exports = handleUserLogin;