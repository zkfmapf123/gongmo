import express from "express";
import routers from "../ROUTERS";
import { isUser } from "../localsMiddleware";
import { userModify, userDetail, apiUserDetail, apiUserModify, apiUserDelete } from "../controllers/userController";
const userRouter = express.Router();

//user만 들어올 수 있따.

userRouter.get(routers.home,(req,res)=>res.send("/user"));
/* user */
userRouter.get(routers.userDetail(),isUser,userDetail);
userRouter.post(routers.userDetail(),isUser,apiUserDetail);
userRouter.get(routers.userModify(),isUser,userModify);
userRouter.post(routers.userModify(),isUser,apiUserModify);
userRouter.get(routers.userDelete(),isUser,apiUserDelete);

export default userRouter;