import routers from "../ROUTERS";
import bcrypt from "bcrypt"
import { User, Poster, UserPoster, Comment } from "../models";
import fs from "fs";
import path from "path";

export const home = async(req,res,next)=>{
    //지정된 시간에 session 다 지우자...
    if(req.user) console.log(`req.user : ${req.isAuthenticated()}`);
    else console.log(`req.user : ${req.isAuthenticated()}`);

    try{
        //view 높은거 5~10개정도
        const posts = await Poster.findAll({
            attribute : ["id","imageUrl","title","divide","separate","target","view","period"],
            order:[["view","desc"]],
            limit : 5
        });

        const posts2 = await Poster.findAll({
            attribute : ["id, imageUrl","title","divide","separate","target","view","period"],
            order:[["created_at","desc"]],
            limit : 5
        });

        const posts3 = await Poster.findAll({
            attribute : ["id","period"],
            order : [["created_at","asc"]]
        });

        deletePoster(posts3);

        //최근만들어진거 5~10개정도
        if(posts) res.set({
            "Cache-Control" : "no-cache"
        }).render("home",{posts, posts2});
        else res.render("home",{posts:[], posts2:[]});

    }catch(error){
        console.error(error);
        next(error);
    }  
}

/*      login        */
export const login = (req,res)=>{
    res.set({
        "Cache-Control" : "no-cache, no-store, must-revalidate"
    }).render("login");
}

export const logout = (req,res)=>{
    req.logout();
    req.session.destroy(); //데이터베이스 안에 session도 다 죽음..
    res.redirect(routers.home);
}

/*             join             */
export const join = (req,res)=>{
    res.set({
        "Cache-Control" : "no-cache, no-store, must-revalidate"
    }).render("join");
}

export const postJoin = async(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;
    const nickName = req.body.name;

    if(password !== passwordCheck){
        res.render("join",{
            errorMessage: "비밀번호가 맞지 않습니다. 다시 시도해주세요.."
        });
    }else{
        try{
           //일단 찾자
            const exUser = await User.findOne({
                where : { email }
            });
            if(exUser){
                res.render("join",{
                    errorMessage:"이미 아이디가 존재합니다."
                });
            }else{
                const result = await bcrypt.hash(password,12);
                await User.create({
                    email : email,
                    nickName : nickName,
                    password : result
                });

                res.redirect(routers.home);
            }
        }catch(error){
            console.error(error);
            next(error);
        }
    }
};

export const find = (req,res) =>{
    res.set({
        "Cache-Control" : "no-cache, no-store, must-revalidate"
    }).render("find");
};

export const postFind= async(req,res)=>{
    let method;
    let nickName;
    let email;

    method = req.body.method;
    
    if(method === "id"){
        nickName = req.body.nickName;
        
        try{
            const user = await User.findOne({
                where : {nickName : nickName}
            });

            if(user){
                res.status(200).json(user.email);
            }else{
                res.status(404).json("not Found");
            }
        }catch(error){
            console.error(error);
        }
    }else{
        nickName = req.body.nickName;
        email = req.body.email;

        try{
            const user = await User.findOne({
                where : {
                    email : email,
                    nickName : nickName
                }
            });

            if(user){
                res.status(200).json("성공");
            }else{
                res.status(400).json("실패");
            }
        }catch(error){
            console.error(error);
        }
    };
};

export const apiFind = async(req,res,next) =>{
    try{
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password,12);
        await User.update({
            password : password},{
                where : {
                    email : email}
            })
            r.status(200).json("성공");
    }catch(error){
        console.error(error);
        next();
    };
};

//안쓰는...
export const apiAdvertisement = async(req,res,next)=>{
    try{
        fs.readdir("poster",(err,files)=>{
            if(err) throw err;

            res.status(200).json(files);
        })
    }catch(error){
        console.error(error);
        next();
    }
}

//효과적이지 않은 로직임...
const deletePoster = async(poster)=>{

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate()-3;
    
    if(month<10) month = `0${month}`;
    if(date<10) date = `0${date}`;

    let todayTime = `${year}-${month}-${date}`;

    try{
        for(const[i] of poster.entries()){
            let posterId = poster[i].id;
            let period = poster[i].period.split("~")[1].trim();
            //console.log(poster[i].id);
            if(period === todayTime || period < todayTime){
                const userPoster = await UserPoster.findAll({
                    attribute:["id","userId","posterId"],
                    where:{
                        posterId : poster[i].id
                    }
                });

                //comment 지우고
                for(const[j] of userPoster.entries()){

                    await Comment.destroy({
                        where:{
                            userPosterId : userPoster[j].id
                        }
                    });
                };

                //userPoster 지우고
                for(const[j] of userPoster.entries()){
                    await UserPoster.destroy({
                        where:{
                            posterId : poster[i].id
                        }
                    });
                };

                try{
                    fs.statSync(`${poster[i].imageUrl}`);
                    fs.unlinkSync(`../crawler${poster[i].imageUrl}`);
                    console.log("delete");
                }catch(error){
                    console.error(error);
                    console.log("파일존재하지않음");
                }

                //포스터파일 지우기
                await Poster.destroy({
                    where:{
                        id : posterId
                    }
                });
                
            }
        }
    }catch(error){
        console.error(error);

    }
}