const boardLeftClick = document.getElementById("leftClick");
const boardRightClick = document.getElementById("rightClick");
const boardFind = document.getElementById("findBoard");

let board = [];
let PAGE_NUMBER = 1;
let BOARD_NUMBER = 0; //board
let BOARD_ITERATION = 0; //15개씩 반복

let color = ["#FFC312","#C4E538","#12CBC4","#FDA7DF",
             "#F79F1F","#A3CB38","#1289A7","#EE5A24",
             "#009432","#0652DD","#EA2027","#1B1464"];

//시작하면 게시판화면 바로 보이게
const boardInteraction = () =>{
    const xhr = new XMLHttpRequest();

    xhr.onload = () =>{
        if(xhr.status === 200){
            board = JSON.parse(xhr.responseText);
            tableBoarding(board);

        }else{
            console.log(Xhr.responseText);
        }
    }

    xhr.open("post","/board");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send();
}

//게시판 화면 한 페이지 당 20개씩 
const tableBoarding = (board) =>{

    board.sort((a,b)=>{
        return b.id - a.id
    });

    const table = document.getElementById("table");
    
    //10개씩
    while(true){
        let COLOR_RANDOM_NUMBER = Math.floor(Math.random() * color.length);
        let time = board[BOARD_NUMBER].createdAt.split("T");
        BOARD_ITERATION++;

        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let a = document.createElement("a");
        let span = document.createElement("span");
        let div = document.createElement("div");

        a.textContent= BOARD_ITERATION;
        td.appendChild(a);
        tr.appendChild(td);

        a =document.createElement("a");
        td=document.createElement("td");
        a.setAttribute("href",`/board/${board[BOARD_NUMBER].id}`);
        a.textContent = board[BOARD_NUMBER].title;
        span.textContent = board[BOARD_NUMBER].separate;
        span.setAttribute("style",`color:${color[COLOR_RANDOM_NUMBER]}`);
        div.appendChild(span);
        div.appendChild(a);

        //오늘날짜 게시글 New 표시
        if(today(time[0])){
            span = document.createElement("span");
            span.textContent = "New"
            a.appendChild(span);
        }

        td.appendChild(div);
        tr.appendChild(td);

        a =document.createElement("a");
        td= document.createElement("td");
        a.textContent = board[BOARD_NUMBER].userNickName;
        td.appendChild(a);
        tr.appendChild(td);

        a=document.createElement("a");
        td=document.createElement("td");
        a.textContent = time[0];
        td.appendChild(a);
        tr.appendChild(td);

        a= document.createElement("a");
        td= document.createElement("td");
        a.textContent = board[BOARD_NUMBER].view;
        td.appendChild(a);
        tr.appendChild(td);

        table.appendChild(tr);
        BOARD_NUMBER++;

        if(BOARD_NUMBER === board.length || BOARD_ITERATION === 15){
            BOARD_ITERATION = 0;
            break;
        }
    }
}

//뒤로
boardLeftClick.addEventListener("click",(e)=>{
    e.preventDefault();
});

//앞으로
boardRightClick.addEventListener("click",(e)=>{
    e.preventDefault();
});

//검색 추출
boardFind.addEventListener("submit",(e)=>{
    e.preventDefault();

    const findNickName = boardFind.firstChild.value;

    const xhr = new XMLHttpRequest();
    xhr.onload = () =>{
        if(xhr.status===200){
            BOARD_NUMBER=0;
            board = JSON.parse(xhr.responseText);

            if(board.length < 1){
                alert("검색 결과가 없습니다.");
            }else{
                //지우는 로직
                removeBording();                
                tableBoarding(board); //검색 값
            }
        }else{
            console.error(error);
        }
    }

    xhr.open("post","/board/find");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        findName : findNickName
    }));
})

//검색 초기화
const removeBording = () =>{
    const table = document.getElementById("table");
    const tableNode = table.children;
    const tableNodeLength = tableNode.length;

    for(let k=1; k<tableNodeLength; k++){
        table.removeChild(tableNode[1]);
    }
}

//날짜 구하기 N
const today = (time) =>{
    let ttoday = new Date();
    let year = ttoday.getFullYear();
    let month = ttoday.getMonth()+1;
    let date = ttoday.getDate();

    if(month <10) month = `0${month}`;
    if(date <10) date = `0${date}`;
    
    let todayTime = `${year}-${month}-${date}`;

    if(time === todayTime) return true;
    else return false;
}

boardInteraction();
