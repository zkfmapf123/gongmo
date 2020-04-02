import express from "express";
import routers from "../ROUTERS";
import { isUser } from "../localsMiddleware";

const analRouter = express.Router();

analRouter.get(routers.home,(req,res)=>res.send("anal"));
analRouter.get(routers.analHand,(req,res)=>res.send("analHand"));
analRouter.get(routers.analTotal,(req,res)=>res.send("analTotal"));
analRouter.get(routers.analUser(),isUser,(req,res)=>res.send("analUser"));

export default analRouter;