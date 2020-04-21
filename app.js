import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParse from "body-parser";
import cookieParse from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import routers from "./ROUTERS";
import homeRouter from "./routers/homeRouter";
import viewRouter from "./routers/viewRouter";
import analRouter from "./routers/analRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./localsMiddleware";
import { sequelize } from "./models";
import MYSQLStore from "express-mysql-session";
import passport from "passport";
import passportConfig from "./passport";
import seeboardRouter from "./routers/seeboardRouter";
import apiRouter from "./routers/apiRouter";

dotenv.config();
const app = express();
sequelize.sync();
passportConfig(passport);
const PORT = process.env.PORT;

//set
app.set("view engine","pug");

//middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use("/poster",express.static("poster"));
app.use("/advertise",express.static("advertise"));
app.use("/assets",express.static("assets")); //이거지워야됨
app.use("/static",express.static("static"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));
app.use(cookieParse());
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.SECRET_STRING,
    cookie:{
        httpOnly:true,
        secure: false,
    },
    //gongoDB에 sessio table 생성된다.
    store: new MYSQLStore({
        host: process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

//router
app.use(routers.home,homeRouter);
app.use(routers.view,viewRouter);
app.use(routers.anal,analRouter);
app.use(routers.user,userRouter);
app.use(routers.seeboard,seeboardRouter);
app.use(routers.api,apiRouter);

//init
app.listen(PORT,()=>console.log(`http://localhost:${PORT} success`));