const authenticationRoutes = require("./authenticationRoutes");
const blogRoutes = require("./blogRoutes");
const uploadRoutes = require("./uploadRoutes");
const adminRoutes = require("./adminRoutes");


const useRoutes = (app) => {
    app.use(authenticationRoutes);
    app.use(blogRoutes);
    app.use(uploadRoutes);
    app.use(adminRoutes);
}


module.exports = useRoutes;