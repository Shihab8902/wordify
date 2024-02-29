const { default: mongoose } = require("mongoose");
const blogCollection = require("../../model/blogModel");

const updateBlog = async (req, res, next) => {
    try {
        const id = req.query.id;
        const data = req.body;
        await blogCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { comments: data });

        res.send("success");
    }
    catch (error) {
        next(error.message);
    }
}


module.exports = updateBlog;