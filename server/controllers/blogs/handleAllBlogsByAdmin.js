const blogCollection = require("../../model/blogModel");

const handleAllBlogsByAdmin = async (req, res, next) => {
    try {
        const result = await blogCollection.find();
        res.send(result);
    }
    catch (error) {
        next(error.message);
    }
}


module.exports = handleAllBlogsByAdmin;