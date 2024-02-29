const express = require("express");
const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const useRoutes = require("./routes");
const port = process.env.PORT || 9000;



//Middlewares
app.use(cors());
app.use(express.json());


//Check server status
app.get("/", (req, res) => {
    res.send({ message: "The server is up and running...." });
});


//use routes
useRoutes(app);


//Handle server errors
app.all("*", (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} does not exist on the server`);
    error.status = 404;
    next(error);
});

app.use(globalErrorHandler);




//Listen server and establish database connection
const run = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`);
    })
}
run();