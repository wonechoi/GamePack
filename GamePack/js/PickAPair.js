/*
	Author: Hyewon Choi
	Date created: July 31, 2018
	Version: 0.1
	Copyright: 1.0
	Purpose: Playing Pick A Pair game
	Description: It is a game requires players to match same elements. 
	It shows whole board for 10 secs at first. 
*/

// symbols of 18 pairs are used for games.
var groupOfSymbols= ["\★","\☆","\♥","\♡","\♠","\♤","\♣","\♧","\♨","\♬","\☎","\♀","\♂","\€","\Ω","\∞","\☞","\☜",
"\★","\☆","\♥","\♡","\♠","\♤","\♣","\♧","\♨","\♬","\☎","\♀","\♂","\€","\Ω","\∞","\☞","\☜"];
// two dimensional array 6*6
var gameBoard= new Array(6);
// 0: no box haven't been clicked   
// 1: one has been clicked  2: state that a player cannot click
var clickNum= 0; 
var firstClickedBox; // store information of a box first clicked
var succeededPairs= 0; // totally 18pairs
var memorizingTimeCounterArray= new Array(); // event ids for memorizing time
var playTimeCounter; // an event id for counting play time
var playedSecs= 0, playedMins= 0; // played secs, mins
var isPossibleToStartNewGame= true; // it is not possible to start new game while showing all of board for 10 secs


// clickBoard(i,j): the action when a box on the gameboard is clicked 
function clickBoard(i,j) {
	var aBox= document.getElementById("board"+i+j);
	
	// if a box is already open is clicked
	if(aBox.innerText != "") {
		document.getElementById("message").innerText= "Choose another";
		return true;
	}
	
	// choose first one in a try
	if(clickNum == 0) {
		clickNum++;
		firstClickedBox= [i,j,gameBoard[i][j]];
		toggleBox(i,j);
	}
	// choose second one in a try
	else if(clickNum==1) {
		clickNum++;
		toggleBox(i,j);
		// if two are not matched
		if(gameBoard[i][j] != firstClickedBox[2])
		{
			setTimeout(function(){
								toggleBox(i,j);
								toggleBox(firstClickedBox[0],firstClickedBox[1]);
								clickNum= 0;},700);
		} else {
			succeededPairs++;
			setTimeout(function(){clickNum= 0;},100);
		}
	}
	
	// if a player succeed to match 18 pairs
	if(succeededPairs == 18)
	{
		clearInterval(playTimeCounter);
		document.getElementById("message").innerText += " You SUCCEEDED!";
	}
}

// toggleBox(i,j): flip a box on the game board
function toggleBox(i,j) {
	var aBox= document.getElementById("board"+i+j);
	if(aBox.innerText=="")
		aBox.innerText= gameBoard[i][j];
	else
		aBox.innerText= "";
}

// toggleBoard(): flip over the game board
function toggleBoard() {
	for(var i=0;i<6;i++) {
		for(var j=0;j<6;j++) {
			toggleBox(i,j);		
		}
	}
}

// resetEvents(): remove events used in last game 
function resetEvents() {
	clearInterval(playTimeCounter);
	for(var i=0;i<=10;i++)
		clearTimeout(memorizingTimeCounterArray[i]);
	
	playedSecs= 0;
	playedMins= 0;
}

// startNewGame(): load a new round
function startNewGame() {
	if(isPossibleToStartNewGame){
		isPossibleToStartNewGame= false;
		document.getElementById("newGames").innerText=" ";
		resetEvents();
		resetBoard();
		toggleBoard();

		// count 10secs down and start game
		for(var i=0;i<=10;i++)
			memorizingTimeCounterArray[i]= count10Secs(1000*i);	
		setTimeout(function(){
			toggleBoard();
			document.getElementById("message").innerText= "GO!";
		}, 11000);
i
		// count play time
		setTimeout(function(){
			clickNum= 0;
			succeededPairs= 0;
			playTimeCounter= setInterval(printCounter,1000);
			document.getElementsByClassName("active")[0].style.visibility="visible";
			document.getElementById("newGames").innerText="New GAME";
			isPossibleToStartNewGame= true;
		}, 12000);
	}
}

// count10Secs(millisecs): print secs left per every 1 secs
function count10Secs(millisecs){
	setTimeout(function(){
		document.getElementById("message").innerText= ""+(10-Number(millisecs)/1000);
	},millisecs);
}

// resetBoard(): arrange symbols on the gameboard randomly
function resetBoard() {	
	for(var i=0;i<6;i++) {
		gameBoard[i] = new Array();
		for(var j=0;j<6;j++) {
			var rdmNum= Math.floor(Math.random()*(36-(i*6)-j));
			gameBoard[i][j]= groupOfSymbols[rdmNum];
			var tmp= groupOfSymbols[36-(i*6)-j-1];
			groupOfSymbols[36-(i*6)-j-1]= groupOfSymbols[rdmNum];
			groupOfSymbols[rdmNum]= tmp;
			document.getElementById("board"+i+j).innerText= "";
		}
	}
	clickNum= 2;
}

// printCounter(): count play time
function printCounter() {
	playedSecs++;
	if(playedSecs>=60)
	{
			playedSecs= 0;
			playedMins++;
	}
	document.getElementById("message").innerText=playedMins+":"+playedSecs;
}