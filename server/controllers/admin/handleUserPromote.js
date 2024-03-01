const { default: mongoose } = require("mongoose");
const userCollection = require("../../model/userModel");

const handleUserPromote = async (req, res, next) => {
    try {
        const id = req.query.id;
        const data = req.body;
        await userCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, data);

        res.send({ message: "success" });

    }
    catch (error) {
        next(error);
    }
}


module.exports = handleUserPromote;