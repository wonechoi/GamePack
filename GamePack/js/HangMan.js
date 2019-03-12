/*
	Author: Hyewon Choi
	Date created: July 31, 2018
	Version: 0.1
	Copyright: 1.0
	Purpose: Playing Hang Man game
	Description: It is a guessing game. 
	A player should guess a word within 10 lives. 
*/

// words is showed up in this game
var wordsArray=['abruptly','absurd','abyss','affix','askew','avenue','awkward','axiom','azure','bagpipes','bandwagon','banjo','bayou','beekeeper','bikini','blitz','blizzard','boggle','bookworm','boxcar','boxful','buckaroo','buffalo','buffoon','buxom','buzzard','buzzing','buzzwords','caliph','cobweb','cockiness','croquet','crypt','curacao','cycle','daiquiri','dirndl','disavow','dizzying','duplex','dwarves','embezzle','equip','espionage','euouae','exodus','faking','fishhook','fixable','fjord','flapjack','flopping','fluffiness','flyby','foxglove','frazzled','frizzled','fuchsia','funny','gabby','galaxy','galvanize','gazebo','giaour','gizmo','glowworm','glyph','gnarly','gnostic','gossip','grogginess','haiku','haphazard','hyphen','iatrogenic','icebox','injury','ivory','ivy','jackpot','jaundice','jawbreaker','jaywalk','jazziest','jazzy','jelly','jigsaw','jinx','jiujitsu','jockey','jogging','joking','jovial','joyful','juicy','jukebox','jumbo','kayak','kazoo','keyhole','khaki','kilobyte','kiosk','kitsch','kiwifruit','klutz','knapsack','larynx','lengths','lucky','luxury','lymph','marquis','matrix','megahertz','microwave','mnemonic','mystify','naphtha','nightclub','nowadays','numbskull','nymph','onyx','ovary','oxidize','oxygen','pajama','peekaboo','phlegm','pixel','pizazz','pneumonia','polka','pshaw','psyche','puppy','puzzling','quartz','queue','quips','quixotic','quiz','quizzes','quorum','razzmatazz','rhubarb','rhythm','rickshaw','schnapps','scratch','shiv','snazzy','sphinx','spritz','squawk','staff','strength','strengths','stretch','stronghold','stymied','subway','swivel','syndrome','thriftless','thumbscrew','topaz','transcript','transgress','transplant','triphthong','twelfth','twelfths','unknown','unworthy','unzip','uptown','vaporize','vixen','vodka','voodoo','vortex','voyeurism','walkway','waltz','wave','wavy','waxy','wellspring','wheezy','whiskey','whizzing','whomever','wimpy','witchcraft','wizard','woozy','wristwatch','wyvern','xylophone','yachtsman','yippee','yoked','youthful','yummy','zephyr','zigzag','zigzagging','zilch','zipper','zodiac','zombie'];
var rndWord; // a word is decided randomly among wordsAppay
var levelOfHangMan= 0; // how many steps are proceeded(how many times a player chose wrong an alphabet)
var succeedCnt= 0; // how many times a player chose correct an alphabet.
var canvas; // a canvas which a hangman will be drawn on
var ctx; // context of a canvas 
var gameOver= false; // if a round can be continued.
var remainedLives= 10; // total number of lives in a round is 10. 

// setGuessingWord(): decide a word randomly which a player should guess
function setGuessingWord() {
	rndWord= wordsArray[Math.floor(Math.random()*wordsArray.length)];
	var wordUl= document.getElementById("wordUl");
	var letters;
	
	while (wordUl.firstChild) {
		wordUl.removeChild(wordUl.firstChild);
	}
	
	for(var i=0;i<rndWord.length;i++) {
		letters= document.createElement('li');
		letters.innerText= '_';
		wordUl.appendChild(letters);
	}
}

// addEventToAlphabets(): add actions after each alphabets is clicked to them
function addEventToAlphabets() {
	var alphabetsLi= document.querySelectorAll(".alphabetsUl>li");
	
	for(var i=0;i<alphabetsLi.length;i++) {
		alphabetsLi[i].addEventListener("click",function(){
			if(!gameOver) {
				// clicked alphabets disappear
				this.setAttribute('id','clickedAlphabets');
				clickAlphabet(this.innerText);
			}
			// case : a player succeed to guess a word
			if(succeedCnt==rndWord.length) { 
				document.getElementById("message").innerText= "YOU ARE SURVIVED!";
				gameOver= true;
			}
			// case : a player fail to guess a word within 10 turns.
			if(levelOfHangMan==10) {
				document.getElementById("message").innerText= "YOU KICKED THE BUCKET.";
				gameOver= true;
			}
		})
	}
}

// clickAlphabet(alphabet): check if the clicked alphabet is a part of guessing word
function clickAlphabet(alphabet) {
	var letters= document.querySelectorAll("#wordUl>li");
	var cnt= 0;
	
	for(var i=0;i<rndWord.length;i++) {
		if(rndWord.charAt(i).toUpperCase() == alphabet) {
			letters[i].innerText= alphabet;
			cnt++;
			succeedCnt++;
		}
	}
	// if the alphabet is not included in the word, draw next step of hangman
	if(cnt==0) {
		drawHangMan();
		document.getElementById("message").innerText= "You have "+(--remainedLives)+" lives.";
	}
}

// drawHangMan(): draw hangman on canvas
function drawHangMan() {
	levelOfHangMan++;
	switch(levelOfHangMan) {
		case 1:
			drawLine(15,147,285,147);
			break;
		case 2:
			drawLine(40,147,40,10);
			break;
		case 3:
			drawLine(30,15,175,15);
			break;
		case 4:
			drawLine(150,15,150,25);
			break;
		case 5:
			ctx.moveTo(150,40);
			ctx.arc(150,40,15,0,Math.PI*2,true);
			ctx.fill();
			ctx.stroke();
			break;
		case 6:
			drawLine(150,55,150,85);
			break;
		case 7:
			drawLine(150,60,110,85);
			break;
		case 8:
			drawLine(150,60,190,85);
			break;
		case 9:
			drawLine(150,85,120,125);
			break;
		case 10:
			drawLine(150,85,180,125);
			break;
	}
}

/* 
	drawLine(pathFromX, pathFromY, pathToX, pathToY): 
			draw line from (pathFromX, pathFromY) to (pathToX, pathToY)
*/
function drawLine(pathFromX, pathFromY, pathToX, pathToY) {
	ctx.moveTo(pathFromX, pathFromY);
	ctx.lineTo(pathToX, pathToY);
	ctx.stroke();
}

// startNewGame(): initialize variables, attributes and messages.
function startNewGame() {
	setGuessingWord();
	levelOfHangMan= 0;
  succeedCnt= 0;
	remainedLives= 10;
	gameOver= false;
	canvas= document.getElementById("hangManCanvas");
  ctx= canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStype= "black";
  ctx.lineWidth= 2;
	
	var alphabetsLi= document.querySelectorAll(".alphabetsUl>li");
	for(var i=0;i<alphabetsLi.length;i++)
		alphabetsLi[i].removeAttribute('id');
	document.getElementById("message").innerText= "You have 10 lives.";
}

// onLoad(): it is run when the game html page is loaded
function onLoad() {
	startNewGame();
	addEventToAlphabets();
}