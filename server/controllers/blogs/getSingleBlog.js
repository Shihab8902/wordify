const { default: mongoose } = require("mongoose");
const blogCollection = require("../../model/blogModel");

const getSingleBlog = async (req, res, next) => {
    try {
        const id = req.query.id;
        const result = await blogCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}


module.exports = getSingleBlog;