import { Poster, UserPoster } from "../models";

export const apiPostPoint = async(req,res,next)=>{
    const postTitle = req.body.postTitle.substring(5);
    const methodNumber = req.body.method;
    const userId = req.user.id;

    try{
        const poster = await Poster.findOne({
            attribute:["id","goodPoint","badPoint"],
            where:{
                title : postTitle
            }
        });

        let goodPoint = poster.goodPoint;
        let badPoint = poster.badPoint;
        goodPoint++;
        badPoint++;

        const userPoster = await UserPoster.findOne({
            attribute:["id","thumbsCount"],
            where:{
                userId : userId,
                posterId : poster.id
            }
        });

        // 유저테이블이 없는 경우
        if(userPoster === null){
            res.status(300).json(1);
        }
        // 유저테이블이 있는데, 이미 한 경우
        else if(userPoster.thumbsCount === false){
            res.status(300).json(2);
        }else{
            //userPoster thumbsCount 바꾸고
        //userPoster good , bad ++;
        if(methodNumber === 1){
            //좋아용버튼
            console.log(poster.id);
            await UserPoster.update({
                thumbsCount : false},{
                    where:{
                        userId : userId,
                        posterId : poster.id
                    }});
            await Poster.update({
                goodPoint : goodPoint},{
                where:{
                    title:postTitle
                }});
            res.status(200).json("success");
        }else{
            //실허용버튼
            console.log(poster.id);
            await UserPoster.update({
                thumbsCount : false},{
                    where:{
                        userId : userId,
                        posterId : poster.id
                    }});
            await Poster.update({
                badPoint : badPoint},{
                where:{
                    title:postTitle
                }});
            res.status(200).json("success");
        }
    }
    }catch(error){
        console.error(error);
    }
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

export const apiText = async(req,res,next) =>{
    const postTitle = req.body.postTitle;

    try{
        const posterText = await Poster.findOne({
            attribute : ["text"],
            where:{
                title : postTitle
            }
        });

        if(posterText.text){
            res.status(200).json(posterText.text);
        }else{
            res.status(400).json("error");
        }
    }catch(eror){
        console.log(error);
    }
}



