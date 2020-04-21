import express from "express";
import routers from "../ROUTERS";
import {getAnalTotal, postAnalTotal } from "../controllers/analControllers";

const analRouter = express.Router();

analRouter.get(routers.home,(req,res)=>res.send("anal"));
analRouter.get(routers.analTotal,getAnalTotal);
analRouter.post(routers.analTotal,postAnalTotal);

export default analRouter;