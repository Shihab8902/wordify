const blogCollection = require("../../model/blogModel");

const getUserSpecificBlogs = async (req, res, next) => {
    try {
        const email = req.query.email;
        const result = await blogCollection.find({ publisherEmail: email });
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}


module.exports = getUserSpecificBlogs;