const getAllBlogs = require("../controllers/blogs/getAllBlogs");
const getRecentBlogs = require("../controllers/blogs/getRecentBlogs");
const getSingleBlog = require("../controllers/blogs/getSingleBlog");
const getTotalBlogCount = require("../controllers/blogs/getTotalBlogCount");
const updateBlog = require("../controllers/blogs/updateBlog");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

//Get recent blog posts
router.get("/api/blog/recent", getRecentBlogs);

//Get all blog posts
router.get("/api/blogs", getAllBlogs);

//Get total blog count
router.get("/api/blogs/total", getTotalBlogCount);

//Get single blog
router.get("/api/blog", getSingleBlog);

//Update blog
router.put("/api/blog", verifyToken, updateBlog);


module.exports = router;