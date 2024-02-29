const authenticationRoutes = require("./authenticationRoutes");


const useRoutes = (app) => {
    app.use(authenticationRoutes);
}


module.exports = useRoutes