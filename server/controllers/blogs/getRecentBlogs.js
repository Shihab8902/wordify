const blogCollection = require("../../model/blogModel");

const getRecentBlogs = async (req, res, next) => {
    try {
        const result = await blogCollection.find().sort({ publishData: -1 }).limit(3);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}


module.exports = getRecentBlogs;