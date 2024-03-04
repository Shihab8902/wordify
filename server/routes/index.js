const authenticationRoutes = require("./authenticationRoutes");
const blogRoutes = require("./blogRoutes");
const adminRoutes = require("./adminRoutes");


const useRoutes = (app) => {
    app.use(authenticationRoutes);
    app.use(blogRoutes);
    app.use(adminRoutes);
}


module.exports = useRoutes;