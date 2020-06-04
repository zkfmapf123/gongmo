import express from "express";
import routers from "../ROUTERS";
import { board,boardCreate, boardUpdate, boardDelete, postBoardCreate, postBoard, boardDetail, postBoardUpdate, apiBoardFind, apiBoardComments, boardComments, boardCommentsPrintAll } from "../controllers/boardControllers";
import { isUser } from "../localsMiddleware";

const boardRouter = express.Router();

boardRouter.get(routers.home,isUser,board);
boardRouter.post(routers.home,isUser,postBoard);

boardRouter.get(routers.boardCreate,isUser,boardCreate);
boardRouter.post(routers.boardCreate,isUser,postBoardCreate);

boardRouter.post(routers.boardCommentsView,isUser,boardCommentsPrintAll);
boardRouter.post(routers.boardComments,isUser,apiBoardComments);
boardRouter.post(routers.boardFind,isUser,apiBoardFind);
boardRouter.get(routers.boardDetail(),isUser,boardDetail);

boardRouter.get(routers.boardUpdate(),isUser,boardUpdate);
boardRouter.post(routers.boardUpdate(),isUser,postBoardUpdate);
boardRouter.post(routers.boardDelete(),isUser,boardDelete);

export default boardRouter;
