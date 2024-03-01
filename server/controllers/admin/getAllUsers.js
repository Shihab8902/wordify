const userCollection = require("../../model/userModel");

const getAllUsers = async (req, res, next) => {
    try {
        const result = await userCollection.find();
        res.send(result);
    }
    catch (error) {
        next(error.message);
    }
}


module.exports = getAllUsers;