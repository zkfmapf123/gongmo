import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import bodyParse from "body-parser";
import cookieParse from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import routers from "./ROUTERS";
import homeRouter from "./routers/homeRouter";
import viewRouter from "./routers/viewRouter";
import analRouter from "./routers/analRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware} from "./localsMiddleware";
import { sequelize } from "./models";
import passport from "passport";
import passportConfig from "./passport";
import seeboardRouter from "./routers/seeboardRouter";
import apiRouter from "./routers/apiRouter";
import boardRouter from "./routers/boardRouter";
const RedisStore = require("connect-redis")(session);

dotenv.config();
const app = express();
sequelize.sync();
passportConfig(passport);
const PORT = process.env.PORT;

//set
app.set("view engine","pug");

//middleware
if(process.env.NODE_ENV === "production"){
    console.log("배포 전용");
    app.use(morgan("combined"));
    app.use(helmet());
    app.use(hpp());
}else{
    console.log("개발 전용");
    app.use(morgan("dev"));
}
app.use("/poster",express.static("poster"));
app.use("/advertise",express.static("advertise"));
app.use("/assets",express.static("assets")); //이거지워야됨
app.use("/static",express.static("static"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));
app.use(cookieParse());
if(process.env.NODE_ENV === "production"){
    app.use(session({
        resave : false,
        saveUninitialized : false,
        secret : process.env.SECRET_STRING,
        proxy : true,
        cookie :{
            httpOnly : true,
            secure : false
        },
    
        store : new RedisStore({
            host : process.env.REDIS_HOST,
            port : process.env.REDIS_PORT,
            pass : process.env.REDIS_PASSWORD,
            logErrors : true
        })
    }));
}else{
    app.use(session({
        resave : false,
        saveUninitialized : false,
        secret : process.env.SECRET_STRING,
        cookie :{
            httpOnly : true,
            secure : false
        },
    
        store : new RedisStore({
            host : process.env.REDIS_HOST,
            port : process.env.REDIS_PORT,
            pass : process.env.REDIS_PASSWORD,
            logErrors : true
        })
    }));
}
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

//router
app.use(routers.home,homeRouter);
app.use(routers.view,viewRouter);
app.use(routers.anal,analRouter);
app.use(routers.user,userRouter);
app.use(routers.seeboard,seeboardRouter);
app.use(routers.board,boardRouter);
app.use(routers.api,apiRouter);

//init
app.listen(PORT,()=>console.log(`http://localhost:${PORT} success`));