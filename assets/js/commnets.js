
const commentCreate = document.getElementById("commentCreate");
const commentsResult = document.getElementById("commentsResult");
const boardColumn = document.getElementsByClassName("boardDetail_column");
const commentCount = document.getElementById("commentCount");
const column = boardColumn[0].childNodes;
const column2 = boardColumn[1].childNodes;
let nickName = column[0].textContent;
let title = column2[0].textContent;
let description = column2[1].textContent;
let userNickName = nickName.split(" ");
let comments = [];

//댓글 작성 버튼
commentCreate.addEventListener("submit",(e)=>{
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        if(xhr.status===200){
            console.log(JSON.parse(xhr.responseText));
            commentPrintAll();
        }else{
            console.error(error);
        }
    }

    xhr.open("post",`/board/comments`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        boardNickName : userNickName[0],
        boardTitle : title,
        boardContent : description,
        commentContent : commentCreate.firstChild.value
    }));
});

const commentPrintAll = () =>{

    console.log("view");
    const xhr = new XMLHttpRequest();

    xhr.onload = () =>{
        if(xhr.status === 200){
            commentCount.textContent = ` 댓글 ${JSON.parse(xhr.responseText).length} 건`
            registerPrintAll(JSON.parse(xhr.responseText));
        }else{
            console.error(error);
        }
    }

    xhr.open("post","/board/comments/view");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        boardNickName : userNickName[0],
        boardTitle : title,
        boardContent : description,
    }));
}

//댓글 적고 초기화
const registerPrintAll = (comments)=>{

    commentsRemoveAll(comments);

    for(let i in comments){

        let tr = document.createElement("tr");
        tr.setAttribute("id", "commentTr");
        let td = document.createElement("td");
        let a = document.createElement("a");
        a.setAttribute("class","commentDelete");
        let time = comments[i].createdAt.split("T");

        td.textContent = comments[i].userNickName;
        td.setAttribute("id", "commentNick");
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = comments[i].content;
        td.setAttribute("id", "commentContent");
        tr.appendChild(td);

        td = document.createElement("td");
        let t = timeCalcul(time[0]);
        td.textContent = t;
        td.setAttribute("id", "commentTime");
        tr.appendChild(td);

        td = document.createElement("td");
        a.textContent = "댓글삭제";
        td.appendChild(a);
        tr.appendChild(td);

        commentsResult.appendChild(tr);
    }
}

//초기화
const commentsRemoveAll = (comments) =>{
    const tableChild = commentsResult.children;
    const tableChildLenth = tableChild.length;
    
    for(let k=0; k<tableChildLenth; k++){
        commentsResult.removeChild(tableChild[0])
    }
}

//댓글 보여주기
commentPrintAll();

//날짜 계산
const timeCalcul = (time)=>{

    console.log("timeCalcul");
    let standardTime = time.split("-");

    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if(month < 10) month = `0${month}`;
    if(date < 10) date = `0${date}`;

    if(year.toString() === standardTime[0].toString()){
        if(month.toString() === standardTime[1].toString() && date.toString() === standardTime[2].toString()) return `오늘`;

        let monthDate = (month - standardTime[1]) * 30;
        let dayDate = (date - standardTime[2]);
        return `${monthDate + dayDate}일 전`;
    }else{
        return (`${year-standardTime}년 전`);
    }
}