'use strict';
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    container.innerHTML = ''; // clear old confetti
    const colors = ['#ff0', '#0ff', '#f0f', '#0f0', '#f00', '#ff7f00', '#007fff', '#ff1493', '#32cd32', '#8a2be2'];

    for (let i = 0; i < 50; i++) { // 50 confetti pieces
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
        container.appendChild(confetti);
    }

    container.classList.add('show');
}

const scores = [0, 0]
const Diceball = document.querySelector('.dice');
const Rolldice = document.querySelector('.btn--roll');
const playerScore1 = document.querySelector('#score--0');
const playerScore2 = document.querySelector('#score--1');
const Holdscore = document.querySelector('.btn--hold')
const Newgame = document.querySelector('.btn--new');


function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active')
    console.log(`Player ${activePlayer} holds the score`)
    // to make it switch 
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active')
}


playerScore1.textContent = 0;
playerScore2.textContent = 0;
Diceball.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
Rolldice.addEventListener('click', function () {
    const roll = Math.trunc((Math.random() * 6) + 1)
    Diceball.classList.remove('hidden');
    Diceball.src = `dice-${roll}.png`
    if (roll !== 1) {
        currentScore += roll;
        console.log(currentScore);
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
})


Holdscore.addEventListener('click', function () {
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(scores[activePlayer])
    if (scores[activePlayer] >= 20) {
        console.log(`Player ${activePlayer} wins!`)
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        createConfetti()
        Rolldice.disabled = true;
        Holdscore.disabled = true;
    } else {
        switchPlayer();
    }
})

Newgame.addEventListener('click', function () {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playerScore1.textContent = 0;
    playerScore2.textContent = 0;
    Diceball.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    Rolldice.disabled = false;
    Holdscore.disabled = false;
    document.querySelector('.confetti-container').classList.remove('show');
});