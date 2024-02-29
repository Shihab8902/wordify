const blogCollection = require("../../model/blogModel");

const getAllBlogs = async (req, res, next) => {
    try {

        const searchString = req.query.search;
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        //Handle case insensitive search
        if (searchString) {
            const result = await blogCollection.find({ title: { $regex: searchString, $options: 'i' } });
            return res.send(result);
        }

        const result = await blogCollection.find().limit(limit).sort({ publishDate: -1 }).skip(limit * page);
        res.send(result);


    }
    catch (error) {
        next(error);
    }
}



module.exports = getAllBlogs;