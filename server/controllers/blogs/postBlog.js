const blogCollection = require("../../model/blogModel");

const postBlog = async (req, res, next) => {
    try {
        const data = req.body;
        await blogCollection.create(data);
        res.send("success");
    }
    catch (error) {
        next(error.message);
    }
}



module.exports = postBlog;