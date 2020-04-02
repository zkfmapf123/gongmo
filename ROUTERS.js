//home
const HOME = "/";
const LOGIN = "/login";
const JOIN = "/join";
const SEARCH = "/search";
const LOGOUT = "/logout";

//view
const VIEW = "/view";
const POST = "/post";
const POST_DETAIL = "/post/:id";

//user
const USER ="/user";
const USER_DETAIL = "/:id";
const USER_MODIFY = "/:id/modify";
const USER_DELETE = "/:id/delete";

//analysis
const ANAL = "/anal";
const ANAL_USER = "/:id";
const ANAL_HAND = "/hand";
const ANAL_TOTAL = "/total";

const routers = {
    //home
    home : HOME,
    login : LOGIN,
    join : JOIN,
    search : SEARCH,
    logout : LOGOUT,

    //view
    view : VIEW,
    post : POST,
    postDetail : (id) =>{
        if(id) return `/post/${id}`;
        else return POST_DETAIL;
    },
    
    //user
    user : USER,
    userDetail : (id)=>{
        if(id) return `/user/${id}`;
        else return USER_DETAIL;
    },
    userModify:(id)=>{
        if(id) return `/user/${id}/modify`;
        else return USER_MODIFY;
    },
    userDelete:(id)=>{
        if(id) return `/user/${id}/delete`;
        else return USER_DELETE;
    },
    
    //anal
    anal : ANAL,
    analUser : (id)=>{
        if(id) return `/anal/${id}`;
        else return ANAL_USER;
    },
    analHand : ANAL_HAND,
    analTotal : ANAL_TOTAL
};

export default routers;
