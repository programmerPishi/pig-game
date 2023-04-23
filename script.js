'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnroll = document.querySelector('.btn--roll');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnholdEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');

let currentscore, activeplayer, scores, playing;

const init = function () {
  activeplayer = 0;
  currentscore = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

dice.classList.add('hidden');
const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--active');
  activeplayer = activeplayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.add('player--active');
  currentscore = 0;
};

init();

btnroll.addEventListener('click', function () {
  // random number btw 1 and 6
  if (playing) {
    const dice2 = Math.trunc(Math.random() * 6 + 1);
    console.log(dice2);
    // display the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${dice2}.png`;
    // check for not being 1
    if (dice2 !== 1) {
      // show the number in current score
      currentscore += dice2;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    } else {
      // if it was 1 seitch player
      switchplayer();
    }
  }
});
btnholdEl.addEventListener('click', function () {
  if (playing) {
    // add current score to totsal score
    scores[activeplayer] += currentscore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];
    // check user total is 100
    if (scores[activeplayer] >= 100) {
      // finish
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // switch player
      switchplayer();
    }
  }
});
btnNewEl.addEventListener('click', init);
