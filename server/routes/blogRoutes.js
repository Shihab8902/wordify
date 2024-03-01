const deleteBlog = require("../controllers/blogs/deleteBlog");
const getAllBlogs = require("../controllers/blogs/getAllBlogs");
const getRecentBlogs = require("../controllers/blogs/getRecentBlogs");
const getSingleBlog = require("../controllers/blogs/getSingleBlog");
const getTotalBlogCount = require("../controllers/blogs/getTotalBlogCount");
const getUserSpecificBlogs = require("../controllers/blogs/getUserSpecificBlogs");
const updateBlog = require("../controllers/blogs/updateBlog");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

//Get user specific blog posts
router.get("/api/blogs/own", verifyToken, getUserSpecificBlogs);

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

//Delete a blog
router.delete("/api/blog", verifyToken, deleteBlog);


module.exports = router;