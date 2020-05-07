import express from "express";
import { apiPost, post, postDeatil, apiText } from "../controllers/viewController";
import routers from "../ROUTERS";

const viewRouter = express.Router();

viewRouter.get(routers.home,(req,res)=>res.send("view"));
viewRouter.get(routers.post,post);
viewRouter.get(routers.postDetail(),postDeatil);

export default viewRouter;