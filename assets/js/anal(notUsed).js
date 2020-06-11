const findResult = document.getElementById("findResult");
const result = document.getElementById("result");
const viewSort = document.getElementById("viewSort");
const goodSort = document.getElementById("goodSort");
const daySort = document.getElementById("daySort");
const findResults = findResult.children;
const separateChild = findResults[2].children;
const radioChild = findResults[3].children;
const targetChild = findResults[4].children;
const amountChild = findResults[5].children;

let findPosters = [];
let i =0;

findResult.addEventListener("submit",(e)=>{
    e.preventDefault();

    let findTitle = findResults[1].value;
    let findSeparate = separateChild[1].value;
    let findDivide = findIteration(radioChild,10);
    let findTarget = findIteration(targetChild,8);
    let findAmount = findIteration(amountChild,10);

    if(findTitle === "") findTitle = "무관";
    if(findSeparate === "" || findSeparate === "세부검색") findSeparate = "무관"

    const xhr = new XMLHttpRequest();

    xhr.onload = () =>{
        if(xhr.status === 200){
            findPosters = JSON.parse(xhr.responseText);
            
            printAll(findPosters,i);
        }else{
            console.error(error);
        }
    }

    xhr.open("post","/anal/normal");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        title : findTitle,
        separate : findSeparate,
        divide : findDivide,
        target : findTarget,
        amount : findAmount
    }));
})

// radioButton 값 찾기
const findIteration = (finds,number) =>{
    let resultData;

    for(let i =2; i<=number; i+=2){
        if(finds[i].checked === true) resultData = finds[i].value;    
    };
    
    return resultData;
}

const printAll = (posters,number) =>{
    //지운다.
    if(number > 0){
        removeResult(posters);   
    }

    for(let i=0; i<posters.length; i++){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let a = document.createElement("a");
        let image = document.createElement("img");

        a.setAttribute("href",`/view/post/${posters[i].id}`);
        image.setAttribute("src",`${posters[i].imageUrl}`);
        image.setAttribute("class","resultImage");
        a.appendChild(image);
        tr.appendChild(a);

        td.textContent = `${posters[i].title}`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = `${posters[i].period}`;
        tr.appendChild(td);
        
        td=document.createElement("td");
        td.textContent = `D${posters[i].d_day}`;
        tr.appendChild(td);

        result.appendChild(tr);
    }
    i++;
}

//두번째 검사 시 부터 지워짐..
const removeResult = (posters) =>{
    const resultChild = result.children;
    const resultChildLength = resultChild.length; // resultChild.length 시 위의 값 참조로 전체가 다 안지워짐...
    
    for(let k=1; k<resultChildLength; k++){
        result.removeChild(resultChild[1]);
    }
};

//조회 수
viewSort.addEventListener("click",(e)=>{
    i++;
    e.preventDefault();

    findPosters.sort((a,b)=>{
        return b.view - a.view;
    });

    printAll(findPosters,i);
})

//좋아요 수
goodSort.addEventListener("click",(e)=>{
    i++;
    e.preventDefault();

    findPosters.sort((a,b)=>{
        return b.good - a.good;
    });

    printAll(findPosters,i);
})

//남은 기간순
daySort.addEventListener("click",(e)=>{
    i++;
    e.preventDefault();

    findPosters.sort((a,b)=>{
        return a.d_day - b.d_day;
    });

    printAll(findPosters,i);
})


