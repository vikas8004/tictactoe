let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector('.popup');
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let messageRef = document.getElementById("message");
let turn = document.querySelector(".turnVal");
let myAudio = new Audio("ting.mp3");
let bgmusic = new Audio("music.mp3");



// winning pattern array
let winningPatternArray = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
]

// player x turn is first
let xturn = true;
let count = 0;


// disables all the button
let disableButtons = () => {
    btnRef.forEach(e => {
        e.disabled = true;
        popupRef.classList.remove("hide");
    })
}

// this function would be executed when any player is the winner.
let winFunction = (value) => {
    disableButtons();
    bgmusic.pause();
    if (value == "X") {
        messageRef.innerHTML = `&#x1F389; <br> 'X' Wins.`
    }
    else {
        messageRef.innerHTML = `&#x1F389; <br> 'O' Wins.`;
    }

};

// draw function
const drawFunction=()=>{
    disableButtons();
    if (count==9) {
        messageRef.innerHTML=`&#x1F60E <br> It's a draw.`
    }
}

// new game function
const enableButton = () => {
    btnRef.forEach(e => {
        e.innerText = "";
        e.disabled = false;
        e.style.cursor = 'default';
    });
    popupRef.classList.add("hide");
};

// playing the new game
newgameBtn.addEventListener('click', () => {
    count = 0;
    enableButton();
    turn.innerHTML = `It's <span id="turn">X</span> turn.`;
});

// restarting the game.
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButton();
    bgmusic.pause();
    turn.innerHTML = `It's <span id="turn">X</span> turn.`;
});

// win Checker logic
let winChecker = () => {
    // looping through all the winning patterns.
    for (const i of winningPatternArray) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        if (element1 != "" && element2 != "" && element3 != "") {
            if ((element1 == element2) && (element2 == element3)) {
                winFunction(element1);
            }
        }
    }

}

// displaying x/o on clicking
btnRef.forEach(e => {
    e.addEventListener("click", () => {
        bgmusic.play();
        if (xturn) {
            xturn = false;
            e.innerText = "X";
            e.disabled = true;
            e.style.cursor = "not-allowed";
            turn.innerHTML = `Now it's <span id="turn">O</span> turn.`;
        }
        else {
            xturn = true;
            e.innerText = "O";
            e.disabled = true;
            e.style.cursor = "not-allowed";
            turn.innerHTML = `Now it's <span id="turn">X</span> turn.`;
        }
        count += 1;
        myAudio.play();
        if (count === 9) {
            drawFunction();
            bgmusic.pause();
        }
        winChecker();
    })
});