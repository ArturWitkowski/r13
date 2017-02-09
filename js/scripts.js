

var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

var gameState = 'notStarted', //started // ended
	player = { name: '', score: 0 },
	computer = { score: 0 };

var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

var winner = document.getElementById('js-winner');

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
}

var playerPickRock = function () {playerPick('rock');},
	playerPickPaper = function () { playerPick('paper');},
	playerPickScissors = function () { playerPick('scissors'); };

pickRock.addEventListener('click', playerPickRock);
pickPaper.addEventListener('click', playerPickPaper);
pickScissors.addEventListener('click', playerPickScissors);



var newGameBtn = document.getElementById('js-newGameButton'),
	newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch (gameState) {
		case 'started': newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block'; 
			break; 
		case 'ended': newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted': 
		default: 
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

setGameElements();



function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		playerNameElem.innerHTML = player.name;
		setGamePoints(); // ta funkcja jeszcze nie powstała 
	} 
}



function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}



function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	var winnerIs = 'player';
	if (playerPick == computerPick) {
		winnerIs = 'none'; // remis 
	} else if ( (computerPick == 'rock' && playerPick == 'scissors') || (computerPick == 'scissors' && playerPick == 'paper') || (computerPick == 'paper' && playerPick == 'rock') ) {
		winnerIs = 'computer'; 
	} if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Wygrana!"; player.score++; 
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Wygrana!"; computer.score++; 
	} 
	setGamePoints();
	if (player.score >= 10 || computer.score >= 10 ) {
		finishGame();
	}
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score; 
}

function finishGame() {
	var theWinner;
	
	console.log("koniec");
	playerResultElem.innerHTML = "";
	computerResultElem.innerHTML = "";
	document.getElementById('js-playerPickElement').style.opacity = 0.3;
	pickRock.removeEventListener('click', playerPickRock);
	pickPaper.removeEventListener('click', playerPickPaper);
	pickScissors.removeEventListener('click', playerPickScissors	);

	if(computer.score > player.score) {
		theWinner = 'komputer';
	} else {
		theWinner = player.name;
	}
	
	winner.style.display = "inline"
	winner.innerHTML="Zwycięzcą jest " + theWinner + " !!!";
		
	
}