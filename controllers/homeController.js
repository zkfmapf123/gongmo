import routers from "../ROUTERS";
import bcrypt from "bcrypt"
import { User, Poster } from "../models";

export const home = async(req,res,next)=>{
    //지정된 시간에 session 다 지우자...
    if(req.user) console.log(`req.user : ${req.isAuthenticated()}`);
    else console.log(`req.user : ${req.isAuthenticated()}`);

    try{
        //일단은 전체적인 것만 나오게끔하자...
        //const posts = await Poster.findAll({});

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

        //최근만들어진거 5~10개정도
        if(posts) res.render("home",{posts, posts2});
        else res.render("home",{posts:[], posts2:[]});

    }catch(error){
        console.error(error);
        next(error);
    }  
}

/*      login        */
export const login = (req,res)=>{
    res.render("login");
}

export const logout = (req,res)=>{
    req.logout();
    req.session.destroy(); //데이터베이스 안에 session도 다 죽음..
    res.redirect(routers.home);
}

/*             join             */
export const join = (req,res)=>{
    res.render("join");
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