const seeboardFormInUser = document.getElementById("seeboardFormInUser");
const seeboardText = document.getElementById("seeboardText"); //게시글
const seeboardPosterTitle = document.querySelector(".postDetail_column h3");
const seeboardFormInUserDelete = document.getElementById("seeboardFormInUserDelete");

const textName = document.querySelector(".seeboard_column span");
const textComment = document.querySelector(".seeboard_column h3");
const textCreateAt = document.querySelector(".seeboard_column p");

/*                  유저 시 : 글 새로만들기                 */
seeboardFormInUser.addEventListener("submit",(e)=>{
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

            //아 .. 이거문제야...
            
            textName.textContent= comments.nickName;
            textComment.textContent= comments.comment;
            textCreateAt.textContent= comments.createdAt;

        }else{
            console.log(xhr.responseText);
        }  
    }


    xhr.open("post",`/seeboard/create`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        postTitle : postTitle,
        text : text,
    }));

    seeboardText.value = "";
});

//유저 시 : 삭제기능
seeboardFormInUserDelete.addEventListener("submit",(e)=>{
    e.preventDefault();
    alert("삭제안돼아직은");
});
