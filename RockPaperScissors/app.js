let userScore = 0;
let computerScore = 0;

let choices = document.querySelectorAll('.choices')
let win_msg = document.querySelector('#win-msg')
let msg_container = document.querySelector('.msg-container')
const user = document.querySelector('#user-score')
const comp = document.querySelector('#comp-score');
const reset = document.querySelector('.reset-btn');

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return options[random];
}

const resetGame = () => {
    reset.classList.add('hide');
    userScore = 0;
    computerScore = 0;
    user.innerText = userScore;
    comp.innerText = computerScore;
    win_msg.innerHTML = '';
    msg_container.classList.remove('hide');
    
}

const userWins = () => {
    userScore++;
    user.innerText = userScore;
    win_msg.innerHTML = 'You Win!';
    reset.classList.remove('hide');
}

const compWins = () => {
    computerScore++;
    comp.innerText = computerScore;
    win_msg.innerHTML = 'Computer Wins!';

    reset.classList.remove('hide');
}


const drawGame = () => {
    win_msg.innerHTML = 'Draw!';

    reset.classList.remove('hide');
}

const playGame = (userChoice) => {
    win_msg.innerHTML = '';
    const compChoice = genCompChoice();
    console.log(userChoice, compChoice);
    if (userChoice === compChoice) {
        drawGame();
    }
    else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        }
        else {
            userWin = compChoice === "rock" ? false : true;
        }
        if (userWin) {
            userWins();
        }
        else {
            compWins();
        }
    }
    msg_container.classList.add('hide');
}

choices.forEach((choices) => {
    choices.addEventListener("click", () => {
        const userChoice = choices.getAttribute("id");
        playGame(userChoice);
    });
});

reset.addEventListener('click', () => {
    resetGame();
});