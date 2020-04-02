const userDetailButton = document.getElementById("userDetail");
const userDelete = document.getElementById("userDelete");

//유저조회
userDetailButton.addEventListener("submit",(e)=>{
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
            const univSpan = document.getElementById("univ");
            const gradeSpan = document.getElementById("grade");
            const averageSpan = document.getElementById("score");
            const citypan = document.getElementById("livesCity");
            const commentSpan = document.getElementById("comment");

            emailSpan.textContent = user.email;
            nickSpan.textContent = user.nickName;
            univSpan.textContent = user.university;
            gradeSpan.textContent = user.grade;
            averageSpan.textContent = user.averageScore;
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
