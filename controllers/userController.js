import {User, UserPoster, Poster, Comment,} from "../models";
import routers from "../ROUTERS";
import { dayCalcuator } from "./viewController";

export const userDetail = async(req,res,next)=>{
    const userId = req.user.id;
    let sum=0;
    
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
            
            sum++;
            const posts = await Poster.findOne({
                attribute : ["id","title","period","separate","target","link"],
                where :{
                    id : userPoster[i].posterId
                }
            });

            const d_day = dayCalcuator(posts.period.split("~"));

            favoritePoster.push({
                id : posts.id,
                title : posts.title,
                period : posts.period,
                separate : posts.separate,
                target : posts.target,
                link : posts.link,
                d_day : d_day
            });
        };
        
        res.set({
            "Cache-Control" : "no-cache"
        }).render("userDetail",{favoritePoster, favorite: sum});

    }catch(error){
        console.error(error);
        next(error);
    }
}

/* 안쓰는 로직 */
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

/*안쓰는 로직 */
export const userModify = (req,res)=>{
    res.render("userModify");
}

/*안쓰는 로직 */
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

/*안쓰는 로직*/
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