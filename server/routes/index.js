const authenticationRoutes = require("./authenticationRoutes");
const blogRoutes = require("./blogRoutes");


const useRoutes = (app) => {
    app.use(authenticationRoutes);
    app.use(blogRoutes);
}


module.exports = useRoutes