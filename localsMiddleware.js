//localMiddleware

import routers from "./ROUTERS"

export const localsMiddleware = (req,res,next)=>{
    res.locals.routers = routers;
    res.locals.user = req.user

    next();
}

export const isUser = (req,res,next)=>{
    if(req.isAuthenticated()) next();
    else res.redirect(routers.home);
}

export const isNotUser = (req,res,next)=>{
    if(!req.isAuthenticated()) next();
    else res.redirect(routers.home);
}