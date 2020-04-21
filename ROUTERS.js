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
const ANAL_TOTAL = "/total";

//seeboard
const SEEBOARD = "/seeboard";
const SEEBOARD_CREATE = "/create";
const SEEBOARD_MODIFY = "/modify";
const SEEBOARD_DELETE = "/delete";

//api
const API = "/api";
const API_POINT = "/apiPoint";
const API_POINT_FAVORITE = "/apiFavorite";

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
    analTotal : ANAL_TOTAL,

    seeboard : SEEBOARD,
    seeboardCreate : SEEBOARD_CREATE,
    seeboardModify : SEEBOARD_MODIFY,
    seeboardDelete : SEEBOARD_DELETE,

    api : API,
    apiPoint : API_POINT,
    apiFavorite : API_POINT_FAVORITE
};

export default routers;
