let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let count = 0;

let turnO = true;

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");  
  for(let box of boxes){
    box.classList.remove("colorO");
    box.classList.remove("colorX");
  }
};

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.classList.add("colorO");
    } else {
      box.innerText = "X";
      turnO = true;
      box.classList.add("colorX");
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(!isWinner && count === 9){
        showMsgDraw();
    }

  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showMsgDraw = () => {
  msg.innerText = `Match draw !`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
