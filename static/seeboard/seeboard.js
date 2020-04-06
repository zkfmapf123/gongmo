const seeboardFormInUser = document.getElementById("seeboardFormInUser");
const seeboardText = document.getElementById("seeboardText");
const seeboardFormInUserDelete = document.getElementById("seeboardFormInUserDelete");

const seeboardFormNotUser = document.getElementById("seeboardFormNotUser");

//유저 시 : 글 새로만들기
seeboardFormInUser.addEventListener("submit",(e)=>{
    e.preventDefault();

    //정리
    const text = seeboardText.value;
    const nickName = document.getElementById("userNickName").innerText;
    const postTitle = document.querySelector(".postDetail_column h3").innerText;

    const xhr = new XMLHttpRequest();

    //받기
    xhr.onload = () =>{
        if(xhr.status === 201) {
            //성공 시
            console.log(xhr.responseText);
        }else{
            //실패 시
            console.log(xhr.responseText);
        }
    }
    //보내기

    xhr.open("post",`/seeboard/create`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        nickName : nickName,
        text : text,
        postTitle : postTitle
    }));

    text.value = "";
});

//유저 시 : 삭제기능
seeboardFormInUserDelete.addEventListener("submit",(e)=>{
    e.preventDefault();
    alert("삭제안돼아직은");
})

//유저 아닐 시 : 아무것도 안됨
seeboardFormNotUser.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    alert("로그인이 필요한 기능입니다.");
})
