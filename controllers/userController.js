import {User} from "../models";
import routers from "../ROUTERS";

export const userDetail = async(req,res,next)=>{
    res.render("userDetail");
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
    const university = req.body.university;
    const grade = req.body.grade;
    const score = req.body.score;
    const city = req.body.city;
    const comment = req.body.comment;

     try{
        const user = await User.findOne({
            where : {email : req.user.email}
        });

        if(user){
            await User.update({
                nickName : nickname,
                university : university,
                grade : grade,
                averageScore : score,
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
    console.log(req.user.email)
    try{
        await User.destroy({
            where : {email : req.user.email}
        });

        res.redirect(routers.logout);

    }catch(error){
        console.error(error);
        next(error);
    }
}