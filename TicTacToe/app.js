let box = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let msgcontainer = document.querySelector('.msg');
let winnermsg = document.querySelector('.winnermsg');
let newgame = document.querySelector('.newgame');


let turnO = true;

const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

box.forEach((box) => {
    box.addEventListener('click', () => {
        console.log('clicked');
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern in win) {
        let val1 = box[win[pattern][0]].innerText;
        let val2 = box[win[pattern][1]].innerText;
        let val3 = box[win[pattern][2]].innerText;

        if (val1 != '' && val2 != '' && val3 != '') {
            if (val1 == val2 && val2 == val3) {
                box[win[pattern][0]].style.backgroundColor = 'lightgreen';
                box[win[pattern][1]].style.backgroundColor = 'lightgreen';
                box[win[pattern][2]].style.backgroundColor = 'lightgreen';
                showWinner(val1);
            }
        }
        
    }
}
const showWinner = (winner) => {
        winnermsg.innerText = `Congratulations! ${winner} won the game`;
        msgcontainer.classList.remove('hide');
}
resetBtn.addEventListener('click', () => {
    resetgame();
});


const resetgame = () => {
    box.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        box.style.backgroundColor = '#E1EFE6';
    });
}

newgame.addEventListener('click', () => {
    resetgame();
    msgcontainer.classList.add('hide');
});