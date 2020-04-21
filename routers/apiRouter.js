import express from "express";
import routers from "../ROUTERS";
import {apiPostFavortie, apiPostPoint } from "../controllers/apiControllers";

const apiRouter = express.Router();

apiRouter.get(routers.home,(req,res)=>res.send("api"));
apiRouter.post(routers.apiPoint,apiPostPoint);
apiRouter.post(routers.apiFavorite,apiPostFavortie);

export default apiRouter;