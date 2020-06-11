import {Poster} from "../models";
import { dayCalcuator } from "./viewController";

export const analTotal = (req,res)=>{
    let posters = [];

    res.set({
        "Cache-Control" : "public max-age : 300000"
    }).render("analTotal",{
        posters
    });
}

export const analNormal = async(req,res,next)=>{
    const title = req.body.title;
    const separate = req.body.separate;
    const divide = req.body.divide;
    const target = req.body.target;
    const amount = req.body.amount;

    let finds = [title,separate,target,amount];

    let posters = [];

    try{
        let poster;

        if(divide === "무관"){
            poster = await Poster.findAll({});
        }else{
            poster = await Poster.findAll({
                where:{
                    divide : divide
                }
            })
        }

        for(const [i] of poster.entries()){

            let posterTitle = poster[i].title;
            let posterSeparate = poster[i].separate;
            let posterTarget = poster[i].target;
            let posterAmount = poster[i].amount;

            let basicPoster = [posterTitle, posterSeparate, posterTarget, posterAmount];
            let j=0;

            //3개가 다 맞던지, 3개가 다 무관이던지
            while(j<basicPoster.length){
                
                if(finds[j] !== "무관"){
                    let compare = new RegExp(`${finds[j]}`);
                    if(compare.exec(basicPoster[j])){
                        console.log("correct");

                        if(j === 3){
                            const d_day = dayCalcuator(poster[i].period.split("~"));
                            posters.push({
                                id : poster[i].id,
                                imageUrl : poster[i].imageUrl,
                                title : poster[i].title,
                                period : poster[i].period,
                                d_day : d_day,
                                good : poster[i].goodPoint,
                                views : poster[i].view
                            });
                        }
                    }else{
                        break;
                    }
                }
                if(j === 3){
                    const d_day = dayCalcuator(poster[i].period.split("~"));
                    posters.push({
                        id : poster[i].id,
                        imageUrl : poster[i].imageUrl,
                        title : poster[i].title,
                        period : poster[i].period,
                        d_day : d_day,
                        good : poster[i].goodPoint,
                        views : poster[i].view
                    });
                }
                j++;
            }
        }

        res.status(200).json(posters);
        console.log(posters);

    }catch(error){
        console.error(error);
        next();
    }
}

export const postAnalSelect = async(req,res,next)=>{
    console.log(req.body);
};