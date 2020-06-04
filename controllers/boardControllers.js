import { Seeboard, SeeboardComments, User } from "../models";
import routers from "../ROUTERS";
import { getTime } from "./viewController";

export const board = (req,res) =>{
    res.render("board");
}

export const postBoard = async(req,res,next)=>{
    try{
        const board = await Seeboard.findAll({});
        
        res.status(200).json(board);
    }catch(error){
        console.error(error);
        next();
    }
}

export const boardDetail = async(req,res,next)=>{
    const boardId = req.params.id;
    let flag = 1; //글 수정, 글 삭제
    let flag2 = 1; //Guest
    let view;
    let comments = [];

    try{
        const board = await Seeboard.findOne({
            where : {
                id : boardId
            }
        });
        
        view = board.view + 1;
        
        //view ++1;
        await Seeboard.update({
            view : view},{
                where:{
                    id : boardId
                }
            });
        
        //본인인지 확인
        if(req.user.nickName !== board.userNickName) flag =0;
        if(req.user) flag2 = 1;

        //시간 String
        //getTime() 이용해서 시간구하자
        
        res.render("boardDetail",{
            board,
            flag : flag,
            flag2 : flag2,
        });

    }catch(error){
        console.error(error);
        next();
    }
}

export const boardCreate = (req,res)=>{
    const userNickName = req.user.nickName;
    
    res.render("boardCreate",{
        userNickName : userNickName
    });
}

export const postBoardCreate = async(req,res,next)=>{
    const userNickName = req.user.nickName;
    const boardTitle = req.body.title;
    const boardContent = req.body.content;
    const boardSeparate = req.body.separate;

    try{
        await Seeboard.create({
            userNickName : userNickName,
            separate : boardSeparate,
            title : boardTitle,
            content : boardContent
        });

        res.redirect(routers.board);
    }catch(error){
        console.error(error);
        next();
    }

}

export const boardUpdate = async(req,res)=>{
    const boardId = req.params.id;

    try{
        const board = await Seeboard.findOne({
            where:{
                id : boardId
            }
        });

        if(board){
            res.render("boardUpdate",{
                board
            });
        }
    }catch(error){
        console.error(error);
        next();
    }
}

export const postBoardUpdate = async(req,res,next)=>{
   
    const boardId = req.params.id;
    const boardTitle =req.body.title;
    const boardContent = req.body.content;

    try{
        await Seeboard.update({
            title : boardTitle,
            content : boardContent},{
                where:{
                    id : boardId
                }
            });
        
        res.redirect(routers.board);
    }catch(error){
        console.error(error);
        next();
    }
}

export const boardDelete = async(req,res,next)=>{
    const boardId = req.params.id;

    try{
        await Seeboard.destroy({
            where:{
                id : boardId
            }
        });

        res.redirect(routers.board);
    }catch(error){
        console.error(error);
        next();
    }
}

export const apiBoardFind = async(req,res,next)=>{
    const findName = req.body.findName;

    try{
        const board = await Seeboard.findAll({
            where:{
                userNickName : findName
            }
        });

        res.status(200).json(board);
    }catch(error){
        console.error(error);
        next();
    }
}

export const apiBoardComments = async(req,res,next)=>{
    console.log(req.body);
    const nickName = req.body.boardNickName;
    const title = req.body.boardTitle;
    //const content = req.body.boardContent.trim();
    const commentContent = req.body.commentContent;

    try{
        const board = await Seeboard.findOne({
            attribute : ["id"],
            where:{
                userNickName : nickName,
                title : title,
            }
        });

        await SeeboardComments.create({
            seeboardId : board.id,
            userEmail : req.user.email,
            content : commentContent
        });

        res.status(200).json("success");

    }catch(error){
        console.error(error);
        next();
    }
}

export const boardCommentsPrintAll = async(req,res,next)=>{
    const nickName = req.body.boardNickName;
    const title = req.body.boardTitle;
    //const boardContent = req.body.boardContent;
    let boardId;
    let commentsArr = [];

    try{
        const board = await Seeboard.findOne({
            where:{
                userNickName : nickName,
                title : title,
            }
        });

        console.log(board);

        if(board){
            boardId = board.id;

            const comments = await SeeboardComments.findAll({
                where:{
                    seeboardId : boardId
                }
            });

            for(const [i] of comments.entries()){

                const user = await User.findOne({
                    where:{
                        email : comments[i].userEmail
                    }
                });

                commentsArr.push({
                    userNickName : user.nickName,
                    content : comments[i].content,
                    createdAt : comments[i].createdAt
                });
            }

            res.status(200).json(commentsArr);
        }
    }catch(error){
        console.error(error);
        next();
    }
}