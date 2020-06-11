const userDetailButton = document.getElementById("userDetail");
const userDelete = document.getElementById("userDelete");

//유저조회
const lookupButton = userDetailButton.addEventListener("submit",(e)=>{
    e.preventDefault();

    //정리

    const xhr = new XMLHttpRequest();
    //받고
    xhr.onload = ()=>{
        if(xhr.status === 200){
            //받을 시
            //console.log(xhr.responseText);
            const user = JSON.parse(xhr.responseText);
            console.log(user);

            const emailSpan = document.getElementById("email");
            const nickSpan = document.getElementById("nickName");
            const targetSpan = document.getElementById("target");
            const citypan = document.getElementById("livesCity");
            const commentSpan = document.getElementById("comment");

            emailSpan.textContent = user.email;
            nickSpan.textContent = user.nickName;
            targetSpan.textContent = user.target;
            citypan.textContent = user.livesCity;
            commentSpan.textContent = user.comment;
        }else{
            //못 받을 시
            console.log(xhr.responseText);
        }
    }

    //보내고
    xhr.open(`post`,`/user/:id`);
    xhr.send();
});

const deleteButton = userDelete.addEventListener("submit",(event)=>{
    event.preventDefault();

    const confirmCheck = confirm("정말로 탈퇴하실 건가요? ");

    if(confirmCheck){
        const message = prompt(`삭제를 원하시면 "유저삭제" 를 적어주세요`)
        if(message === "유저삭제"){

            const xhr = new XMLHttpRequest();

            xhr.onload = () =>{
                if(xhr.status === 200){
                    console.log("삭제스");

                    window.location.href = "/";
                }else{
                    console.log("노 삭제스");
                }
            }
            console.log("삭제원한댜");

            xhr.open("post","/user/:id/delete");
            xhr.send();
            
        }else alert("철자가 틀렸습니다.");
    }else{
        alert("유저삭제를 취소합니다.");
    }
});

lookupButton();
deleteButton();