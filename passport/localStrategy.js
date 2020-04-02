const localStrategy = require("passport-local").Strategy;
const { User} = require("../models");
const bcrypt = require("bcrypt");

module.exports = (passport) =>{
    passport.use(new localStrategy({
    }, async(username, password, done)=>{
        try{
            const exUser = await User.findOne({
                where : {email : username}
            });

            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser)
                }else{
                    done(null, false, {message: "비밀번호가 틀림"});
                }
            }else{
                done(null, false,{message:"가입되지 않은 회원입니다."});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};