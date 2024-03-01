const authenticationRoutes = require("./authenticationRoutes");
const blogRoutes = require("./blogRoutes");
const uploadRoutes = require("./uploadRoutes");


const useRoutes = (app) => {
    app.use(authenticationRoutes);
    app.use(blogRoutes);
    app.use(uploadRoutes);
}


module.exports = useRoutes