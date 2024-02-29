const getAllBlogs = require("../controllers/blogs/getAllBlogs");
const getRecentBlogs = require("../controllers/blogs/getRecentBlogs");
const getTotalBlogCount = require("../controllers/blogs/getTotalBlogCount");

const router = require("express").Router();

//Get recent blog posts
router.get("/api/blog/recent", getRecentBlogs);

//Get all blog posts
router.get("/api/blogs", getAllBlogs);

//Get total blog count
router.get("/api/blogs/total", getTotalBlogCount);


module.exports = router;