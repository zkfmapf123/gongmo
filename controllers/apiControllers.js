import { Poster, UserPoster } from "../models";

export const apiPostPoint = async(req,res,next)=>{
    // userPoster에 true / false를 찾아야 한다.
    // 이건 조금 생각해보자...
}

export const apiPostFavortie = async(req,res,next)=>{
    const postTitle = req.body.postTitle.substring(5);
    const userId = req.user.id;
    let posterId;

    try{
        const poster = await Poster.findOne({
            attribute : ["id"],
            where : { title : postTitle}
        });

        posterId = poster.id;

        console.log(`userID : ${userId} posterID : ${posterId}`);

        //userPoster확인
        const userPoster = await UserPoster.findOne({
            attribute : ["thumbsCount","favorite"],
            where : {
                userId : userId,
                posterId : posterId
            }
        });

        console.log(`userPosters : ${userPoster}`);

        if(userPoster === null){
            //userPoster 먼저
            res.status(204).json("you make a comment");
        }else{
            console.log(`thumbsCount : ${userPoster.thumbsCount}`);
            console.log(`favorite : ${userPoster.favorite}`);
            
            if(userPoster.thumbsCount === true){
                //찜목록을 할경우
                await UserPoster.update({
                    thumbsCount : false,
                    favorite : true},{
                        where:{
                            userId : userId,
                            posterId: posterId
                        }
                    });
                res.status(200).json("success favorite");
            }else{
                //이미 찜 목록에 담은경우
                await UserPoster.update({
                    thumbsCount : true,
                    favorite : false},{
                        where:{
                            userId : userId,
                            posterId : posterId
                        }
                    });
                res.status(205).json("cancle favorite");
            }
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}



