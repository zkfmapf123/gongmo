//home
const HOME = "/";
const LOGIN = "/login";
const JOIN = "/join";
const SEARCH = "/search";  /* 추후 */
const FIND = "/find";
const LOGOUT = "/logout";
const API_FIND= "/api/find";

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
const ANAL_NORMAL = "/normal";
const ANAL_TOTAL = "/total";

//seeboard
const SEEBOARD = "/seeboard";
const SEEBOARD_CREATE = "/create";
const SEEBOARD_MODIFY = "/modify";
const SEEBOARD_DELETE = "/delete";

//board
const BOARD = "/board";
const BOARD_CREATE = "/create";
const BOARD_DETAIL = "/:id";
const BOARD_UPDATE = "/:id/update";
const BOARD_DELETE = "/:id/delete";
const BOARD_FIND = "/find";
const BOARD_COMMENT = "/comments";
const BOARD_COMMENT_VIEW = "/comments/view";

//api
const API = "/api";
const API_POINT = "/apiPoint";
const API_POINT_FAVORITE = "/apiFavorite";
const API_TEXT = "/apiText";

const routers = {
    //home
    home : HOME,
    login : LOGIN,
    join : JOIN,
    search : SEARCH,
    logout : LOGOUT,
    find : FIND,
    apiFind : API_FIND,
    
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
    analNormal : ANAL_NORMAL,
    analTotal : ANAL_TOTAL,

    seeboard : SEEBOARD,
    seeboardCreate : SEEBOARD_CREATE,
    seeboardModify : SEEBOARD_MODIFY,
    seeboardDelete : SEEBOARD_DELETE,

    board : BOARD,
    boardDetail : (id)=>{
        if(id) return `/board/${id}`;
        else return BOARD_DETAIL;
    },

    boardCreate : BOARD_CREATE,

    boardUpdate : (id) =>{
        if(id) return `/board/${id}/update`;
        else return BOARD_UPDATE
    },

    boardDelete : (id) =>{
        if(id) return `/board/${id}/delete`;
        else return BOARD_DELETE
    },
    boardComments : BOARD_COMMENT,
    boardFind : BOARD_FIND,
    boardCommentsView : BOARD_COMMENT_VIEW,

    api : API,
    apiPoint : API_POINT,
    apiFavorite : API_POINT_FAVORITE,
    apiText : API_TEXT
};

export default routers;
