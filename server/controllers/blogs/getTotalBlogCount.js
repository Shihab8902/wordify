const blogCollection = require("../../model/blogModel");

const getTotalBlogCount = async (req, res, next) => {
    try {
        const total = await blogCollection.estimatedDocumentCount();
        res.send({ total });
    }
    catch (error) {
        next(error);
    }
}

module.exports = getTotalBlogCount;