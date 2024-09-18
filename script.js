const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongletter = document.querySelector(".wrong-letters span");
const typingInput = document.querySelector(".typing-input");
const guess = document.querySelector(".guess-left span");

let word, incorrects = [], corrects = [], maxguesses;

function randomWord() {
    let ranObj = wordlist[Math.floor(Math.random() * wordlist.length)];
    word = ranObj.word.toUpperCase(); // Store the word in uppercase
    maxguesses = 8;
    corrects = [];
    incorrects = [];

    wrongletter.innerText = ""; // Reset wrong letters display
    hint.innerText = ranObj.hint;
    guess.innerText = maxguesses;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initgame(e) {
    let key = e.target.value.toUpperCase(); // Ensure uppercase
    if (key.match(/^[A-Za-z]$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxguesses--;
            incorrects.push(key); // Only push if the guess is wrong
        }
        guess.innerText = maxguesses;
        wrongletter.innerText = incorrects.join(", ");
    }
    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`CONGRATULATIONS! You found the word ${word}`);
            randomWord();
        } else if (maxguesses < 1) {
            alert("Game over! You don't have remaining guesses.");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
document.addEventListener("keydown", () => typingInput.focus());
typingInput.addEventListener("input", initgame);
inputs.addEventListener("click", () => typingInput.focus());
