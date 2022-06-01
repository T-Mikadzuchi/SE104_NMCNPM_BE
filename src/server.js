import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from "./config/connectDB";
import cors from 'cors';
import csrf from 'csurf'
import middleware from './middleware'

require('dotenv').config();

// const csrfMiddleware = csrf({ cookie : true });

let app = express();
app.use(cors({ origin: true }));
// app.use(middleware.decodeToken);
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser());
// app.use(csrfMiddleware);

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8081;
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port)
})