let userseq=[];  // keeping track of what user has selected (colour sequence). It gets reset after every level up.
let gameseq=[];  // keepint track of what user selected from starting. It only gets reset after match is over
let colour=["red","yellow","green","blue"];
let start=false;
let h2=document.querySelector("#key");
let level=0;
document.addEventListener("keypress",function(){  // any key pressed from keyboard starts the game
    if(start===false){
        levelup(); // starting the game.
    }
    start=true;
});

function levelup(){
    userseq=[]; // after every level up userseq gets reset to empty. 
    level++;
    h2.innerText=`level ${level}`;
    let randomNumber=Math.floor(Math.random()*4); // generating random value upto 4.
    let randomColour=colour[randomNumber];  // choosing the colour based on their index.
    let btn=document.querySelector(`.${randomColour}`);  
    btn.classList.add("gameflash");  // adding a gameflash class which flases the button clicked.
    gameseq.push(randomColour);  
    setTimeout(()=> {
        btn.classList.remove("gameflash")
    },250);  // removing the gameflash.
}

function check(idx){
    if(userseq[idx]===gameseq[idx]){            // if idx index colour is same in userseq and gameseq then it checks whether last entered index was the las index or not.
        if(userseq.length==gameseq.length){  // if it was the last index then level up.
            setTimeout(() => {
                levelup();
            },500);
        }
    }
    else{                                                  // if idx index colour does not matches then reset everything.
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
    userseq.push(usercolour); // adding the colour to user seq.
    check(userseq.length-1); // checking upto last index.
}

let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpressed);  // btnpressed function has two works. one is to add the colour to userseq and second is to check for the correct sequence.
}

function reset(){  // resets the values to their initial values.
    level=0;
    gameseq=[];
    userseq=[];
    start=false;
};
