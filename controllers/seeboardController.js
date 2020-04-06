import { Comment, Poster, User } from "../models";

export const apiCreate = async(req,res,next)=>{
    const nickName = req.body.nickName; //유저닉네임
    const text = req.body.text; //게시글
    const postTitle = req.body.postTitle; //post번호

    try{
        const comment = await Comment.create({
            comment : text
        });

        if(comment){
            const post = await Poster.findOne({
                where : {title : postTitle}
            });

            const user = await User.findOne({
                where : {nickName : nickName}
            })

            //댓글 해주기
        }

        //json으로 넘겨줘야한다.(nickname, comment 두개로보내줘야...)

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