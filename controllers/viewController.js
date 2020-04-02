import { Post } from "../models";

export const post = (req,res)=>{
    res.render("post");
}  

export const postDeatil = async(req,res)=>{

    const postId = req.params.id;
    try{
        const posts = await Post.findOne({
            where : {id : postId}
        });

        res.render("postDetail", { posts });
    }catch(error){
        console.error(error);
    }
}