import { Poster, UserPoster, Comment, User } from "../models";
import fs from "fs";

export const apiPost = async(req,res,next)=>{
    res.render("post");
}  

export const postDeatil = async(req,res)=>{

    const postId = req.params.id;

    try{
        const posts = await Poster.findOne({
            where : {id : postId}
        });
    
        if(posts){
            console.log(posts.view);
            let viewNumber = posts.view;
            viewNumber++;
            console.log(viewNumber);

            await Poster.update({
                view : viewNumber},{where : { id : posts.id}
            });

            /*              댓글 기능               */
            let userPoster = [];
            let comments = [];

            //for of 문으로 동기식운영으로 짜자.
            const posterId = req.params.id;

            userPoster = await UserPoster.findAll({
                attributes:["userId","commentId"],
                where : { posterId : posterId}
            });

            //댓글 창
            for(const[i] of userPoster.entries()){

                let userNickName;
                let userComment;
                let userCommentCreateAt;

                console.log(`userId : ${userPoster[i].userId}, commentId :${userPoster[i].commentId}`);

                userNickName = await User.find({
                    attributes:["nickName"],
                    where : {id : userPoster[i].userId}
                });

                console.log(userNickName.nickName);

                userComment = await Comment.find({
                    attributes:["comment","createdAt"],
                    where :{id : userPoster[i].commentId}
                });

                console.log(userComment.comment);

                let created_at = userComment.createdAt.toString();
                //나중에 시간 가공하자...

                console.log(created_at);

                comments.push({nickName : userNickName.nickName, 
                               comment  : userComment.comment,
                               createdAt : created_at});
            };

            //console.log(comments);

            //여기서 중요한건 정렬을 해줘야한다..
            //배열안에서 createAt을 중심으로 최신순으로 정렬알고리즘을 진행해야한다...
            res.render("postDetail", { posts, comments });
        }
    }catch(error){
        console.error(error);
    }
}

export const post = async(req,res,next)=>{
    const separate = req.query.name;
    console.log(separate);
    
    let divideNumber;
    if(separate === "공모전") divideNumber = 1;
    else if(separate === "대외활동") divideNumber =3;
    else if(separate === "장학금") divideNumber =2;
    else divideNumber =4;

    console.log(divideNumber);

    let posts = [];

    try{
            posts = await Poster.findAll({
            where : { divide : divideNumber}
        });

        if(posts) res.render("post",{ posts });
        else res.render("post", {posts : []})
    }catch(error){
        console.error(error);
        next(error);
    }
}