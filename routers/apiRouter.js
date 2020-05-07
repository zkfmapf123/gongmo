import express from "express";
import routers from "../ROUTERS";
import {apiPostFavortie, apiPostPoint, apiText } from "../controllers/apiControllers";

const apiRouter = express.Router();

apiRouter.get(routers.home,(req,res)=>res.send("api"));
apiRouter.post(routers.apiPoint,apiPostPoint);
apiRouter.post(routers.apiFavorite,apiPostFavortie);
apiRouter.post(routers.apiText,apiText);

export default apiRouter;