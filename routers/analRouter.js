import express from "express";
import routers from "../ROUTERS";
import {analTotal, analNormal, postAnalSelect, sortSelect } from "../controllers/analControllers";

const analRouter = express.Router();

analRouter.get(routers.home,(req,res)=>res.send("anal"));
analRouter.get(routers.analTotal,analTotal);
analRouter.post(routers.analNormal,analNormal);

/*안쓰는 로직*/
analRouter.post(routers.analNormal,postAnalSelect);

export default analRouter;