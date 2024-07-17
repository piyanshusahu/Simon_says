let userseq=[];
let gameseq=[];
let colour=["red","yellow","green","blue"];
let start=false;
document.addEventListener("keypress",function(){
    if(start===false){
        levelup();
    }
    start=true;
});
let h2=document.querySelector("#key");

let level=0;
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randomNumber=Math.floor(Math.random()*4);
    let randomColour=colour[randomNumber];
    let btn=document.querySelector(`.${randomColour}`);
    btn.classList.add("gameflash");
    gameseq.push(randomColour);
    setTimeout(()=> {
        btn.classList.remove("gameflash")
    },250);
}

function check(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(() => {
                levelup();
            },500);
        }
    }
    else{
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor="white";
        },200);
        h2.innerText=`game over! your score was ${level}
         press any other key`;
        let value=document.querySelector("pr");
        if(Number(value.innerText) < level){
            value.innerText=level;
        }
        reset();
    }
}

function btnpressed(){
    let btn=this;
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
    usercolour=btn.getAttribute("id");
    userseq.push(usercolour);
    check(userseq.length-1);
}

let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpressed);
}

function reset(){
    level=0;
    gameseq=[];
    userseq=[];
    start=false;
};
