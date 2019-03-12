			var correctColor=[]; // 0:r 1:g 2:b of an answer color
			var correctAnswer; // which one is answer among colorBox
			var colorBox; // loaded Box elements in HTML
		  var colorBoxArr=[];	// [i][j] i is box number, j is rgb		
			var checkClick = document.getElementsByClassName("colorBox"); // 
			var colorBoxLen=3; // EASY mode : 3 HARD mode : 6
					

			// each colorBox has event function which check if clicked one is correct
			for(var i=0;i<checkClick.length;i++){
				checkClick[i].addEventListener("click",function(){
					if(this.style.backgroundColor == 
						 "rgb("+correctColor[0]+", "+correctColor[1]+", "+correctColor[2]+")") {
						colorBox = document.querySelectorAll(".colorBox");
						for(var i=0;i<colorBoxLen;i++)
							colorBox[i].style.backgroundColor =
								"RGB("+correctColor[0]+", "+correctColor[1]+", "+correctColor[2]+")";
						document.getElementById("newColors").textContent="Play Again?";
					} else {
						this.style.backgroundColor = "black";
					}
				});		
			}
			
			//CSS changed when EASY/HARD mode is selected
			document.getElementById("EASY").addEventListener("click",function(){
				document.getElementById("EASY").classList.add("clickedMenu");
				document.getElementById("HARD").classList.remove("clickedMenu");
				document.getElementById("EASY").style.color="white";
				document.getElementById("HARD").style.color="#006bb3";
				colorBoxLen=3;
				initRGB();
				colorBox[3].style.backgroundColor = "black";
				colorBox[4].style.backgroundColor = "black";
				colorBox[5].style.backgroundColor = "black";
			});
			document.getElementById("HARD").addEventListener("click",function(){
				document.getElementById("HARD").classList.add("clickedMenu");
				document.getElementById("HARD").style.color="white";
				document.getElementById("EASY").classList.remove("clickedMenu");
				document.getElementById("EASY").style.color="#006bb3";
				colorBoxLen=6;
				initRGB();
			});

			// init when newColor/playAgain menu is clicked
			document.getElementById("newColors").addEventListener("click", function(){
				initRGB();
			})
			
			// it is run when this html page is loaded
			function onLoad() {
				document.getElementById("EASY").classList.add("clickedMenu");
				document.getElementById("EASY").style.color="white";
				initRGB();
				colorBox[3].style.backgroundColor = "black";
				colorBox[4].style.backgroundColor = "black";
				colorBox[5].style.backgroundColor = "black";
			}
			
			// init RGB on screen
			function initRGB() {
				document.getElementById("newColors").textContent="NEW COLORS";
				var rgbSpan = document.getElementsByClassName("rgb");
				for(var i=0;i<rgbSpan.length;i++) {
					rgbSpan[i].textContent = Math.floor(Math.random()*256);
					correctColor[i] = rgbSpan[i].textContent;
				}
				initColor();
			}
			
			// init color of color Box
			function initColor() {
				colorBox = document.querySelectorAll(".colorBox");
				correctAnswer = Math.floor(Math.random()*colorBoxLen);
				for(var i=0;i<colorBoxLen;i++) {
					if(i==correctAnswer) {
						colorBox[i].style.backgroundColor = 
							"RGB("+correctColor[0]+", "+correctColor[1]+", "+correctColor[2]+")";
						colorBoxArr[i] = [];
						colorBoxArr[i][0] = correctColor[0];
						colorBoxArr[i][1] = correctColor[1];
						colorBoxArr[i][2] = correctColor[2];
					}
					else {
						colorBoxArr[i] = [];
						colorBoxArr[i][0] = Math.floor(Math.random()*256);
						colorBoxArr[i][1] = Math.floor(Math.random()*256);
						colorBoxArr[i][2] = Math.floor(Math.random()*256);
						colorBox[i].style.backgroundColor= "RGB("+colorBoxArr[i][0]+", "
							+colorBoxArr[i][1]+", "+colorBoxArr[i][2]+")";
					}
				}
			}