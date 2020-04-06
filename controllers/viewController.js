import { Poster } from "../models";
import fs from "fs";

export const apiPost = async(req,res,next)=>{
    res.render("post");
}  

export const postDeatil = async(req,res)=>{

    const postId = req.params.id;
    const commentUsers = 0;
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
            
            //post번호의 해당하는것으로만 게시글줘야하는기능추가해야하마..
            res.render("postDetail", { posts, commentUsers });
        }
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