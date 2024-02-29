require("dotenv").config();
const userCollection = require("../../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        //Check for user duplication
        const isExist = await userCollection.findOne({ email: email });
        if (isExist) return res.json({ message: "user already exist!" });

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        //Save user and assign token
        const result = await userCollection.create({ name, email, password: hashedPassword, role });
        const token = jwt.sign(result.email, process.env.TOKEN_SECRET);
        const user = {
            name: result.name,
            email: result.email,
            role: result.role
        }

        res.json({ token, user });

    }
    catch (error) {
        next(error.message);
    }
}


module.exports = handleRegister;