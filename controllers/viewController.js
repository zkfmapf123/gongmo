import { Poster, UserPoster, Comment, User } from "../models";

export const apiPost = async(req,res,next)=>{
    res.render("post");
}  

export const postDeatil = async(req,res)=>{

    const postId = req.params.id;

    try{
        const posts = await Poster.findOne({
            where : {id : postId}
        });
    
        if(posts){
            console.log(posts.view);
            let viewNumber = posts.view;
            viewNumber++;
            console.log(viewNumber);

            await Poster.update({
                view : viewNumber},{where : { id : posts.id}
            });
        }
        /*              댓글 기능               */
        let comments = [];
        let commentsId =[];

        commentsId = await UserPoster.findAll({
            attribute : ["id","userId"],
            where : {
                posterId : postId
            }
        });

        for (const [i] of commentsId.entries()) {

            let nickName;
            let commentInformation;

            console.log(`id : ${commentsId[i].id}`);
            console.log(`userId : ${commentsId[i].userId}`);

            //해당 유저의 닉네임을 찾는다.
            nickName = await User.findOne({
                attribute: ["nickName"],
                where: {
                    id: commentsId[i].userId
                }
            });

            //해당 userPosterId 해당하는 comment, createAt를 찾는다
            commentInformation = await Comment.findOne({
                attribute: ["comment", "createdAt"],
                where: {
                    userPosterId: commentsId[i].id
                }
            });

            if(commentInformation === null){
                //userposter는 존재하나 comment는 존재하지 않을 때...
                console.log("null");
            } else {

                let time = commentInformation.createdAt.toString().split("T");
                //comments.push 해주면된다.
                comments.push({
                    nickName: nickName.nickName,
                    comment: commentInformation.comment,
                    createdAt: time[0]
                });
            }
        }
        //text 가공
        let text = posts.text.split("■");

        for(let i=0; i<text.length; i++){
            text[i] = `●` + text[i];
        }
        res.render("postDetail",{posts,text,comments});

    }catch(error){
        console.error(error);
    }
}

export const post = async(req,res,next)=>{
    const separate = req.query.name;
    console.log(separate);
    
    let divideNumber;
    if(separate === "공모전") divideNumber = 1;
    else if(separate === "대외활동") divideNumber =3;
    else if(separate === "장학금") divideNumber =2;
    else divideNumber =4;

    console.log(divideNumber);

    let posts = [];

    try{
            posts = await Poster.findAll({
            where : { divide : divideNumber}
        });

        if(posts) res.render("post",{ posts });
        else res.render("post", {posts : []})
    }catch(error){
        console.error(error);
        next(error);
    }
}