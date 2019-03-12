/*
	Author: Hyewon Choi
	Date created: July 31, 2018
	Version: 0.1
	Copyright: 1.0
	Purpose: Playing Casino Craps game
	Description: It is a dice game. At the beginning of the game, the player rolls a pair of dice and computes the total. If the total is 2, 3, or 12 (called "craps"), the player loses. If the total is 7 or 11 (called a "natural"), the player wins.
	If the total is any other number, that number becomes the "point". From here, the player keeps rolling the dice until (a) the point comes up again, in which case the player wins, or (b) a 7 appears, in which case the player loses. The numbers 2,3,11, and 12 no longer have special significance after the first rolls.
*/

// an Array includes six icons of six value of a dice.
var dicesArray = [
	["<i class='fas fa-dice-one'></i>"],
	["<i class='fas fa-dice-two'></i>"],
	["<i class='fas fa-dice-three'></i>"],
	["<i class='fas fa-dice-four'></i>"],
	["<i class='fas fa-dice-five'></i>"],
	["<i class='fas fa-dice-six'></i>"]
];
var firstDice; // a value of first dice. 0-5 represent each of 1-6.
var secondDice; // a value of second dice. 0-5 represent each of 1-6.
var sumOfDices= 0; // sum of values of first dice and second dice 
var firstTryYN= true; // if this try is first try of a game or not.
var gameOver= false;  // if a round can be continued.
var point; //a point which a player made at first try and a player should make to win after first try.

// rollDices(): set dices and figure sum of them out.
function rollDices() {
	if(!gameOver) {
		sumOfDices= 0;
		var rndNum= Math.floor(Math.random()*6);
		sumOfDices += (rndNum+1);
		firstDice= rndNum;
		//firstDice= dicesArray[rndNum];

		rndNum= Math.floor(Math.random()*6);
		sumOfDices += (rndNum+1);
		secondDice= rndNum;
		//secondDice= dicesArray[rndNum];

		drawDice(1, firstDice);
		drawDice(2, secondDice);

		calResult();
		}
}

// calResult(): calculate the result of a try.
function calResult() {
	var messageBox= document.getElementById("messageBox");
	
	if(firstTryYN) {
		// first try : 2,3,12 -> Lose / 7,11 -> win / other numbers -> point.
		firstTryYN= !firstTryYN;
		if(sumOfDices == 2 || sumOfDices == 3 || sumOfDices == 12) {
			gameOver= true;
			messageBox.innerHTML= "<p>That's craps. You LOSE!</p>";
		} else if(sumOfDices == 7 || sumOfDices == 11) {
			gameOver= true;		
			messageBox.innerHTML= "<p>That's a natural. You WIN!</p>";
		} 
		else {
			point= sumOfDices;
			messageBox.innerHTML= "<p>Rolling dices: "+(firstDice+1)+" + "+(secondDice+1)+" = "+sumOfDices+"</p>";
			messageBox.innerHTML += "<p>Your point is "+point+"</p>";
		}
	}
	else {
		// 7 -> Lose / point -> Win / others -> roll again
		if(sumOfDices == 7) {
			gameOver= true;
			messageBox.innerHTML += "<p>Rolling dices: "+(firstDice+1)+" + "+(secondDice+1)+" = "+sumOfDices+"</p>";
			messageBox.innerHTML += "<p>That's a 7. You LOSE!</p>";
		} else if(sumOfDices == point) {
			gameOver= true;
			messageBox.innerHTML += "<p>Rolling dices: "+(firstDice+1)+" + "+(secondDice+1)+" = "+sumOfDices+"</p>";
			messageBox.innerHTML += "<p>You made your point. You WIN!</p>";
		} else {
			messageBox.innerHTML += "<p>Rolling dices: "+(firstDice+1)+" + "+(secondDice+1)+" = "+sumOfDices+"</p>";
		}
	}
}

// drawDice(diceNum, diceToBeDrawn): draw dices depends on what number each dice has.
function drawDice(diceNum, diceToBeDrawn) {
	var dice;
	if(diceNum == 1)
		dice= document.getElementById("firstDice");
	else
		dice= document.getElementById("secondDice");
	
	dice.innerHTML= dicesArray[diceToBeDrawn];
	if(sumOfDices == 10 || sumOfDices == 12) {
		if(document.getElementById("sumOfDices"))
			document.getElementById("sumOfDices").id="sumOfDices10n12";
		document.getElementById("sumOfDices10n12").innerText= sumOfDices; 
	}
	else {
		if(!document.getElementById("sumOfDices"))
			document.getElementById("sumOfDices10n12").id="sumOfDices";
		document.getElementById("sumOfDices").innerText= sumOfDices; 
	}
}

// startNewGame(): initialize variables and messages.
function startNewGame() {
	firstTryYN= true;
	gameOver= false;
	document.getElementById("firstDice").innerHTML="";
	document.getElementById("secondDice").innerHTML="";
	document.getElementById("sumOfDices").innerHTML="";
	document.getElementById("messageBox").innerHTML="<p>Game start! Roll the dices.</p>";
}