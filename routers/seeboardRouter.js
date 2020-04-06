import express from "express";
import routers from "../ROUTERS";
import { apiCreate, apiModify, apiDelete } from "../controllers/seeboardController";
import { isUser } from "../localsMiddleware";

const seeboardRouter = express.Router();

seeboardRouter.post(routers.seeboard,(req,res)=>res.send("error"));
seeboardRouter.post(routers.seeboardCreate,isUser,apiCreate);
seeboardRouter.post(routers.seeboardModify,isUser,apiModify);
seeboardRouter.post(routers.seeboardDelete,isUser,apiDelete);

export default seeboardRouter;