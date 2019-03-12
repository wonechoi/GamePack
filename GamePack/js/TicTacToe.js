/*
	Author: Hyewon Choi
	Date created: July 31, 2018
	Version: 0.1
	Copyright: 1.0
	Purpose: Playing Tic Tac Toe game
	Description: It is a game for two players, X and Y, 
	who take turns marking a character the space in a 3*3 gameboard.
	The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
*/

var player= "X"; // which does player have a turn to play
var gameOver= false; // if a round can be continued.
var cntClick= 0; // count valid clicks until 9 to figure out if a game ends as draw

// clickBoard(i,j): actions when a cell of the game board is clicked.
function clickBoard(i,j) {
	var boardValue= document.getElementById("board"+i+j);
	if(gameOver) 
	{
		return true;
	}	
	else if(boardValue.innerText == "Y" || boardValue.innerText == "X") {
		// when a player clicks a cell already clicked.
		document.getElementById("message").innerText= "Choose another";
		return true;
	}
	
	// if it was turn of a player "X"
	if(player == "X") {
		player= "Y";
		cntClick++;
		boardValue.innerText= "X";
		boardValue.style.background= "red";
		document.getElementById("message").innerText= "Player Y go!";
	} else { // if it was turn of a player "Y"
		player= "X";
		cntClick++;
		boardValue.innerText= "Y";
		boardValue.style.background= "blue";
		document.getElementById("message").innerText= "Player X go!"; 
	}
	checkWin();
	
	// if number of valid clicks is 9 but game haven't over. 
	if(cntClick == 9 && !gameOver)
	{
		document.getElementById("message").innerText= "Draw!";
		gameOver= true;
		return true;
	}
}

// checkWin(): if a player take 3 consecutive cells vertically/horizontally/diagonally 
function checkWin() {
	for(var i=0;i<3;i++) {
		if(((document.getElementById("board"+i+0).innerText.trim() != "T")&&              
				(document.getElementById("board"+i+0).innerText ==                     
				 document.getElementById("board"+i+1).innerText) &&
				(document.getElementById("board"+i+0).innerText ==                      
				 document.getElementById("board"+i+2).innerText)) ||

			 ((document.getElementById("board"+0+i).innerText.trim() != "T")&& 
				(document.getElementById("board"+0+i).innerText ==
				 document.getElementById("board"+1+i).innerText) &&
				(document.getElementById("board"+0+i).innerText ==
				 document.getElementById("board"+2+i).innerText))) {
			document.getElementById("message").innerText= (player=="X")?"Player Y wins!":"Player X wins!";
			gameOver= true;
			return true;
		}
	}

	if(((document.getElementById("board00").innerText==
			 document.getElementById("board11").innerText) &&
			(document.getElementById("board00").innerText==
			 document.getElementById("board22").innerText)) ||

		 ((document.getElementById("board02").innerText==
			 document.getElementById("board11").innerText) &&
			(document.getElementById("board02").innerText==
			 document.getElementById("board20").innerText))) {
		document.getElementById("message").innerText= (player=="X")?"Player Y wins!":"Player X wins!";
		gameOver=true;
		return true;
	}
}

// startNewGame(): initialize the game board and variables.
function startNewGame() {
	document.getElementById("board00").innerText= "T";
	document.getElementById("board01").innerText= "I";
	document.getElementById("board02").innerText= "C";
	document.getElementById("board10").innerText= "T";
	document.getElementById("board11").innerText= "A";
	document.getElementById("board12").innerText= "C";
	document.getElementById("board20").innerText= "T";
	document.getElementById("board21").innerText= "O";
	document.getElementById("board22").innerText= "E";

	for(var i=0;i<9;i++)
		document.getElementsByClassName("gameBoard")[i].style.backgroundColor= "white";

	document.getElementById("message").innerText= "Player X go!";
	player= "X";
	gameOver=false;
	cntClick=0;
}