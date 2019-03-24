/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
.p -> class selector
#p -> id selector
p  -> tag selector
*/

var scores, currentPlayer, roundScore, pointToWin;

init();

function init() {
  var inputPoint = document.getElementById('wp').value;
  pointToWin = document.getElementById('wp').value;
  //undefined, 0, null or "" are COERCED to false.
  if(inputPoint) {
    pointToWin = inputPoint;
  } else {
    pointToWin = 100;
  }
  scores = [0,0];
  currentPlayer = 0;
  roundScore = 0;
  //dice = Math.floor(Math.random() + 1);

  //  Usually, we use document.querySelector to manipulate the DOM
  //document.querySelector('#current-' + currentPlayer).textContent = dice;
  //  When we want to change the html
  //document.querySelector('#current-' + currentPlayer).innerHTML = '<em>' + dice + '</em>';
  //don`t show the dice in enterStep && Initialization
  var dicelist = document.querySelectorAll('.dice');
  for(i=0; i < dicelist.length; i++) {
    dicelist[i].style.display = 'none';
  }
  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

/*
Events:Notifications that are sent to notify the code
that something happend on the webpage;
examples : clicking a button, resizing a window, scrolling down
or pressing a key

Event listener: A function that performs an action based
on a certain event. It waits for a specific event to happen
*/

var turnChange = function() {
  //change the active player panel , use toggle to manipulate the classlist
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  //hide the dice in during the turn change
  var dicelist = document.querySelectorAll('.dice');
  for(i=0; i < dicelist.length; i++) {
    dicelist[i].style.display = 'none';
  }
}

var displayDices = function(dice1, dice2) {
  var diceDOM1 = document.getElementById('dice-1');
  var diceDOM2 = document.getElementById('dice-2');
  diceDOM1.style.display = 'block';
  diceDOM2.style.display = 'block';
  diceDOM1.src = 'dice-' + dice1 + '.png';
  diceDOM2.src = 'dice-' + dice2 + '.png';
}

//for the button event, we ususally use anonymous function.
//event occurs, change the related variables.
document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. random number
  var dice1 = Math.floor(Math.random()*6 + 1);
  var dice2 = Math.floor(Math.random()*6 + 1);

  //2. display Dice
  displayDices(dice1, dice2);

  //3. update the roundScore
  var currentScoreDom = document.querySelector('#current-' + currentPlayer)
  if(dice1 != 1 && dice2 != 1) {
  //This code is so bad, dont use textContent for calculation, instead, use variables
  //currentScoreDom.textContent = parseInt(currentScoreDom.textContent) + dice;
   console.log('Woops, you just rolled one 1 and lost rount points')
    roundScore += dice1 + dice2;
    currentScoreDom.textContent = roundScore;
} else if (dice1 == 1 && dice2 == 1 ) {//Two 1  will lose all
    console.log('Woops, you just rolled two 1s and lost all points');
    scores[currentPlayer] = 0;
    document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
    currentPlayer = 1 - currentPlayer;
    roundScore = 0;
    currentScoreDom.textContent = '0';
    turnChange();
  } else {
  //turn change
  currentPlayer = 1 - currentPlayer;
  roundScore = 0;
  currentScoreDom.textContent = '0';
  turnChange();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[currentPlayer] += roundScore;
  roundScore = 0;
  document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
  document.getElementById('current-' + currentPlayer).textContent = 0;
  if(scores[currentPlayer] >= pointToWin) {
    //hide the dice
    var dicelist = document.querySelectorAll('.dice');
    for(i=0; i < dicelist.length; i++) {
      dicelist[i].style.display = 'none';
    }
    //remove the currentPlayer class and add the winner class
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
    document.querySelector('#name-' + currentPlayer).textContent = 'winner!';
    //stop the Game, disable the button
    document.querySelector('.btn-hold').disabled = true;
    document.querySelector('.btn-roll').disabled = true;
  } else {
    currentPlayer = 1 - currentPlayer;
    turnChange();
  }
});

//new GAME
document.querySelector('.btn-new').addEventListener('click', function() {
  init();
  //activate the button
  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.btn-roll').disabled = false;
});
