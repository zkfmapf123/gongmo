import { Poster, UserPoster, Comment, User } from "../models";
import routers from "../ROUTERS";

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

                //const time = getTime(commentInformation.createdAt.toString());
                //console.log(time);
                const time = timeCalculator(commentInformation.createdAt.toString());
                
                comments.push({
                    nickName: nickName.nickName,
                    comment: commentInformation.comment,
                    time: time
                });
            }
        }
        //text 가공
        let text = posts.text.split("■");

        for(let i=0; i<text.length; i++){
            text[i] = `●` + text[i];
        }

        const D_day = dayCalcuator(posts.period.split("~"));
        
        res.set({
            "Cache-Control" : "no-cache"
        }).render("postDetail",{posts,text,comments,Day:D_day});

    }catch(error){
        console.error(error);
    }
}

export const post = async(req,res,next)=>{
    const separate = req.query.name;
    console.log(separate);
    
    let divideNumber;
    if(separate === "공모전") divideNumber = 1;
    else if(separate === "봉사활동") divideNumber =2;
    else if(separate === "대외활동") divideNumber =3;
    else divideNumber =4;

    console.log(divideNumber);

    let posts = [];

    try{
            posts = await Poster.findAll({
            where : { divide : divideNumber}
        });

        if(posts) res.set({
            "Cache-Control" : "no-cache"
        }).render("post",{ posts });
        else res.set({
            "Cache-Control" : "no-cache"
        }).render("post", {posts : []})
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const getTime = (time)=>{
    //시간구하기스...
}

export const dayCalcuator = (index) =>{

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
    
    const num = index[1].split("-");
    const date1 = new Date(num[0],num[1],num[2]);
    const date2 = new Date(year,month,date);

    const btMs = date2.getTime() - date1.getTime();
    let dday = btMs/(1000*60*60*24);

    if(dday > 0){
        return `+${dday}`;
    }else{
        return dday;
    }
}

export const timeCalculator = (index)=>{
    let standardYear;
    let standardMonth;
    let standardDay;

    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() +1;
    let date = today.getDate();
    if(month < 10) month = `0${month}`;
    if(date < 10) date = `0${date}`;

    const time = (index.split("GMT")[0]).split(" ");
    switch(time[1])
    {
        case "Jan":standardMonth ="01"; break; 
        case "Feb":standardMonth ="02"; break;
        case "Mar":standardMonth ="03"; break;
        case "Apr":standardMonth ="04"; break;
        case "May":standardMonth ="05"; break;
        case "Jun":standardMonth ="06"; break;
        case "Jul":standardMonth ="07"; break;
        case "Aug":standardMonth ="08"; break;
        case "Sep":standardMonth ="09"; break;
        case "Oct":standardMonth ="10"; break;
        case "Nov":standardMonth ="11"; break;
        case "Dec":standardMonth ="12"; break;
    }
    standardYear = time[3];
    standardDay = time[2];

    console.log(`${year}-${month}-${date}`);
    console.log(`${standardYear}-${standardMonth}-${standardDay}`);

    if(year.toString() === standardYear.toString()){
        let monthData = (month-standardMonth)*30;
        let dayDate = date-standardDay;

        if(month.toString() === standardMonth.toString() && date.toString() === standardDay.toString()) return `오늘`;

        return `${monthData + dayDate}일 전`;
    }else{
        let data = standardYear - year;
        return `${data}년 전`;
    }
}