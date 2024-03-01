const { default: mongoose } = require("mongoose");
const blogCollection = require("../../model/blogModel");

const deleteBlog = async (req, res, next) => {
    try {
        const id = req.query.id;
        await blogCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        res.send({ message: "deleted" });
    }
    catch (error) {
        next(error);
    }
}


module.exports = deleteBlog;