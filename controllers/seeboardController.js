import { Comment, Poster, UserPoster} from "../models";

export const apiCreate = async(req,res,next)=>{
    const userId = req.user.id;
    const postTitle = req.body.postTitle.substring(5);
    const text = req.body.text;

    let posterId;
    
    //userId == commentId
    
    try{
        //posterId를 찾고
        const poster = await Poster.findOne({
            attribute:["id"],
            where : { title : postTitle}
        });
        
        let userPoster;
        if(poster){
            posterId = poster.id;
            let userPosterId;
            //userPoster를 만들어줄거다.
            //이미 userPoster가 존재한다면... (댓글 이미썻음)
            userPoster = await UserPoster.findOne({
                where :{
                    userId : userId,
                    posterId : posterId
                }
            });

            //댓글이 존재하지 않다면
            if(userPoster === null){
                await UserPoster.create({
                    userId : userId,
                    posterId : posterId,
                    favorite : false
                });
            
                //comment를 만든다
                userPosterId = await UserPoster.findOne({
                    attribute:["id"],
                    where :{
                        userId : userId,
                        posterId : posterId,
                    }
                });

                if(userPosterId){
                    await Comment.create({
                        userPosterId : userPosterId.id,
                        comment : text
                    });
                }
                res.status(200).json("success comment");
            }else{

                //존재하나, comment는 없을 수 있다.
                console.log(`userPosterId : ${userPoster.id}`);

                const comment = await Comment.findOne({
                    where:{
                        userPosterId : userPoster.id
                    }
                });
                
                if(comment === null){
                    //이미 전에 지웠던 경험... 다시 생성
                    await Comment.create({
                        userPosterId : userPoster.id,
                        comment : text
                    });

                    res.status(200).json("success comment");
                } else {

                    //댓글이 존재한단 얘기는 이미 댓글을 썻다.
                    res.status(300).json("already exists comment");
                }

            }
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const apiModify = (req,res)=>{
    console.log(req);
}

export const apiDelete = async(req,res)=>{
    const postTitle = req.body.postTitle.substring(5);
    const userId = req.user.id;

    try{
        const posts = await Poster.findOne({
            attribute : ["id"],
            where:{title : postTitle}
        });

        let posterId = posts.id;

        const userPost = await UserPoster.find({
            attribute:["id"],
            where:{
                userId : userId,
                posterId : posterId
            }
        });

        if(userPost.id === null){
            //userpost가 없다면
            res.status(205).json("userPoster가 없음");
        }else{
            const comment = await Comment.findOne({
                attribute : ["id"],
                where:{
                    userPosterId : userPost.id
                }
            });

            if(comment === null){
                res.status(205).json("comment가 없다");
            }else{
                await Comment.destroy({
                    where:{
                        id : comment.id
                    }
                });

                res.status(200).json("success");
            }
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}