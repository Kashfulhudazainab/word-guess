
const inputs=document.querySelector(".inputs");

const resetBtn=document.querySelector(".reset-btn");

const hint=document.querySelector(".hint span");

const wrongletter=document.querySelector(".wrong-letter span");

let word,incorrects=[],corrects=[],maxguesses;

const typingInput=document.querySelector(".typing-input");

const guess=document.querySelector(".guess-left span");

function randomWord() {
    let ranObj=wordlist[
      Math.floor(Math.random()* wordlist.length) 
    ];
  word=ranObj.word;
  maxguesses=8;
  corrects=[];
  incorrects=[];

  wrongletter.innerText=incorrects;
hint.innerText=ranObj.hint;
guess.innerText=maxguesses;

   let html="";
   for(let i=0;i<word.length;i++){
    html+=`<input type="text" disabled />`;
   }
   inputs.innerHTML=html;
}

randomWord();

function initgame(e){
   let key=e.target.value;
   if(key.match(/^[A-Za-z]+$/)&& incorrects.includes(` ${key}`)&& corrects.includes(key)){
      if(word.includes(key)){
        for(let i=0;i<word.length;i++){
         if(word[i]===key){
            corrects.push(key)
            inputs.querySelectorAll("input")[i].value=key;
         }

        }
      }else {
         maxguesses--;
         
         incorrects.push(` ${key}`);
      }
      guess.innerText=maxguesses;
      wrongletter.innerText=incorrects;
   }
   typingInput.value="";

   setTimeout(() => {
if(corrects.length===word.length){
alert(`CONGRAS! You found the word ${word.toupperCase()}`);
randomWord();
}

   else if(maxguesses<1){
      alert("Game over You don't have remaining guesses");
      for(let i=0;i<word.length;i++){
         inputs.querySelectorAll("input")[i].value=word[i];
      }
   }
});
}

resetBtn.addEventListener("click",randomWord);

document.addEventListener("keydown",() => typingInput.focus());

typingInput.addEventListener("inputs",initgame);

inputs.addEventListener("click",() => typingInput.focus());