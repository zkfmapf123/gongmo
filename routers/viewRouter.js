import express from "express";
import routers from "../ROUTERS";
import { post, postDeatil } from "../controllers/viewController";

const viewRouter = express.Router();

viewRouter.get(routers.home,(req,res)=> res.send("view"));

viewRouter.get(routers.post,post);
viewRouter.get(routers.postDetail(),postDeatil);

export default viewRouter;