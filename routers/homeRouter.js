import express from "express";
import { home, login, join, search, logout, postLogin, postJoin, find, getFind, postFind, apiFind, apiAdvertisement} from "../controllers/homeController";
import routers from "../ROUTERS";
import { isNotUser, isUser } from "../localsMiddleware";
import passport from "passport";

const homeRouter = express.Router();

homeRouter.get(routers.home,home);
homeRouter.post("/advertise",apiAdvertisement);
//login
homeRouter.get(routers.login,isNotUser,login);
homeRouter.post(routers.login,isNotUser,passport.authenticate("local",{
    successRedirect: routers.home,
    failureRedirect: routers.login
}));
//join
homeRouter.get(routers.join,isNotUser,join);
homeRouter.post(routers.join,isNotUser,postJoin);

homeRouter.get(routers.find,isNotUser,find);
homeRouter.post(routers.find,isNotUser,postFind);
homeRouter.post(routers.apiFind,isNotUser,apiFind);

homeRouter.get(routers.logout,isUser,logout);

export default homeRouter;