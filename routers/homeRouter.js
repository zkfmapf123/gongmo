import express from "express";
import { home, login, join, search, logout, postLogin, postJoin } from "../controllers/homeController";
import routers from "../ROUTERS";
import { isNotUser, isUser } from "../localsMiddleware";
import passport from "passport";

const homeRouter = express.Router();

homeRouter.get(routers.home,home);
//login
homeRouter.get(routers.login,isNotUser,login);
homeRouter.post(routers.login,isNotUser,passport.authenticate("local",{
    successRedirect: routers.home,
    failureRedirect: routers.login
}));
//join
homeRouter.get(routers.join,isNotUser,join);
homeRouter.post(routers.join,isNotUser,postJoin);
homeRouter.get(routers.logout,isUser,logout);

export default homeRouter;