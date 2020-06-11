const seeboardFormInUser = document.getElementById("seeboardFormInUser");
const seeboardText = document.getElementById("seeboardText"); //게시글
const seeboardPosterTitle = document.querySelector(".postDetail_column h3");
const seeboardFormInUserDelete = document.getElementById("seeboardFormInUserDelete");

const goodButton = document.getElementById("goodPoint");
const badButton = document.getElementById("badPoint");
const favoriteButton = document.getElementById("favorite");
const goodNumber = document.getElementById("good").innerText;
const badNumber = document.getElementById("bad").innerText;

const good = goodButton.addEventListener("click",(e)=>{
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.onload = () =>{
        if(xhr.status === 200){
            console.log(xhr.responseText);
            window.location.reload();
        }else if(xhr.status === 300){
            console.log(xhr.responseText);
            if(xhr.responseText === "1"){
                alert("댓글을 먼저 작성하시길 바랍니다.");
            }else{
                alert("이미 평가한 항목입니다.");
            }
        }else{
            console.log("에러");
        }
    }

    xhr.open("post","/api/apiPoint");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        postTitle : seeboardPosterTitle.innerText,
        method : 1
    }));
});

const bad = badButton.addEventListener("click",(e)=>{
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.onload = () =>{
        if(xhr.status === 200){
            console.log(xhr.responseText);
            window.location.reload();
        }else if(xhr.status === 300){
            console.log(xhr.responseText);
            if(xhr.responseText === "1"){
                alert("댓글을 먼저 작성하시길 바랍니다.");
            }else{
                alert("이미 평가한 항목입니다.");
            }
        }else{
            console.log("에러");
        }
    }

    xhr.open("post","/api/apiPoint");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        postTitle : seeboardPosterTitle.innerText,
        method : 2
    }));
})

const favorite = favoriteButton.addEventListener("click",(e)=>{
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.onload = ()=>{
        if(xhr.status === 200){
            console.log(xhr.statusText);

            alert("찜 하기 목록에 추가되었습니다.");
        }else if(xhr.status === 205){
            alert("찜 하기 목록이 취소되었습니다. ");
        }else{
            alert("댓글 작성 후 가능합니다.");
        }
    }

    xhr.open("post","/api/apiFavorite");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        postTitle : seeboardPosterTitle.innerText
    }));
})

/*                  유저 시 : 글 새로만들기                 */
const newComment = seeboardFormInUser.addEventListener("submit",(e)=>{
    e.preventDefault();

    //정리
    const text = seeboardText.value;
    const postTitle = seeboardPosterTitle.innerText;

    console.log(`postTitle : ${postTitle} seeboardText : ${text}`);

    const xhr = new XMLHttpRequest();

    //보내기
    xhr.onload = ()=>{
        if(xhr.status===200){
            const comments = JSON.parse(xhr.responseText);
            console.log(comments);

            window.location.reload(); //새로고침

        }else{
            alert("이미 기재한 댓글이 존재합니다.");
            seeboardText.value = "댓글은 한번만 기재가 가능합니다.";
        }  
    }


    xhr.open("post",`/seeboard/create`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        postTitle : postTitle,
        text : text,
    }));
});

//유저 시 : 삭제기능
const deleteComment = seeboardFormInUserDelete.addEventListener("submit", (e) => {
    e.preventDefault();

    const up = confirm("댓글을 삭제하시겠습니까? ");

    if (up) {
        const postTitle = seeboardPosterTitle.innerText;

        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (xhr.status === 200) {

                window.location.reload();
            } else {
                console.log(xhr.responseText);
                alert("삭제할 댓글이 없습니다.");
            }
        }

        xhr.open("post", "/seeboard/delete");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            postTitle: postTitle
        }));
    }
});

good();
bad();
favorite();
newComment();
deleteComment();