import {User, UserPoster, Poster, Comment,} from "../models";
import routers from "../ROUTERS";

export const userDetail = async(req,res,next)=>{
    const userId = req.user.id;
    
    //찜한목록
    try{
        let favoritePoster = [];

        const userPoster = await UserPoster.findAll({
            attribute : ["posterId"],
            where:{ userId : userId,
                    favorite : true
            }
        });

        for(const[i] of userPoster.entries()){

            const posts = await Poster.findOne({
                attribute : ["id","title","period"],
                where :{
                    id : userPoster[i].posterId
                }
            });

            favoritePoster.push({
                id : posts.id,
                title : posts.title,
                period : posts.period
            });
        };
        
        res.render("userDetail",{favoritePoster});

    }catch(error){
        console.error(error);
        next(error);
    }
}

export const apiUserDetail = async(req,res,next)=>{
    console.log(req.user.email);

    try{
        const user = await User.findOne({
            where : {email : req.user.email}
        });

        if(user){
            res.status(200).json(user);
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const userModify = (req,res)=>{
    res.render("userModify");
}

export const apiUserModify = async(req,res,next)=>{

    const nickname= req.body.nickname;
    const grade = req.body.grade;
    const score = req.body.score;
    const city = req.body.city;
    const comment = req.body.comment;
    const target = req.body.target;

    console.log(`target : ${target}`);

    let targetString = "";

    if(target === "1") targetString = "대학생";
    else if(target === "2") targetString = "청소년";
    else targetString = "기타";

     try{ 
        const user = await User.findOne({
            where : {email : req.user.email}
        });

        if(user){
            await User.update({
                nickName : nickname,
                target : targetString,
                livesCity : city,
                comment : comment},{
                where : {email: req.user.email}})};
        res.redirect(`/user/${req.body.email}`);
     }catch(error){
        console.error(error);
        next(error);
     }
}

export const apiUserDelete = async(req,res,next)=>{
    console.log("없애자...");
    
    const userId = req.user.id;

    try{
        const userPosterId = await UserPoster.findAll({
            attribute : ["id"],
            where : {
                userId : userId
            }
        });

        //해당하는 코멘트 지우기
        for( const[i] of userPosterId.entries()){
            console.log(userPosterId[i].id);

            await Comment.destroy({
                where :{
                    userPosterId : userPosterId[i].id
                }
            });
        }

        //해당하는 유저포스터 지우기
        await UserPoster.destroy({
            where : {
                userId : userId
            }
        });

        //해당하는 유저 지우기
        await User.destroy({
            where:{
                id : userId
            }
        });

        res.status(200).json("삭제");
        
    }catch(error){
        console.error(error);
        next(error);
    }
}