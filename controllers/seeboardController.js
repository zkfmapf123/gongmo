import { Comment, Poster, UserPoster } from "../models";

export const apiCreate = async(req,res,next)=>{
    const userId = req.user.id; //유저아이디
    const commentText = req.body.text;
    const postTitle = req.body.postTitle.substring(5);
    
    let posterId; //포스터 아이디
    let commentId; //댓글 정보 아이디

    //ajax로 넘겨줄거
    let jsonArr = [];
    let jsonUserNickName = req.user.nickName; 
    let jsonCommentText = "";
    let jsonCreatAt = "";
    
    console.log(`userId : ${userId}
                 postTitle : ${postTitle}
                 commentText : ${commentText}`);

    try{
        // 1.posterId를 찾자
        const posts = await Poster.find({
            where : {title : postTitle}
        });

        posterId = posts.id;
        console.log(posterId);

        if(posterId){
            // 2.comment 생성
            const comment = await Comment.create({
                comment : commentText
            });

            if(comment){
                console.log("comment 생성");
                commentId = comment.id;
                jsonCommentText = comment.comment;
                jsonCreatAt = comment.createdAt.toString();

                //3.userposter 생성
                const userPoster = await UserPoster.create({
                    userId : userId,
                    posterId : posterId,
                    commentId : commentId,
                    favorite: false
                });

                if(userPoster) console.log("userPoster 생성");

                //해당 유저 아이디랑, 코맨트를 넘겨주자...
                jsonArr.push({nickName : jsonUserNickName, comment: jsonCommentText, createdAt : jsonCreatAt});

                res.status(200).json(jsonArr);
            }
        }else{
            console.log("안됐음스");
        }
    }catch(error){
        console.error(error);
        next(error);
    }  
}

export const apiModify = (req,res)=>{
    console.log(req);
}

export const apiDelete = (req,res)=>{
    console.log(req);
}