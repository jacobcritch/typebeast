Reset();
function Reset(){
	wordCount = 0;
	playing = false;
	document.getElementById('gameinput').value = "";

	gameText = 'The quick brown fox jumped over the long winding fence';
	document.getElementById('gametext').innerHTML = gameText;
	gameTextArrOrg = gameText.split(" ");
	gameTextArr = gameText.split(" ");
	gameTextArrLength = gameTextArr.length;
	document.getElementById('gameinput').disabled = false;
	document.getElementById('wpm').innerHTML = 'WPM: ?'
}

function GameLoop()
{	
	if (playing === false){playing = true; startTime = new Date();}
	inputElement = document.getElementById('gameinput');
	input = inputElement.value;
	
	if ( (input === gameTextArr[0] + " ") || (input === gameTextArrOrg[gameTextArrLength-1] && wordCount===gameTextArrLength-1) ) {
		wordCount += 1;
		gameTextArr.shift();
		document.getElementById('gametext').innerHTML = gameTextArr.join(' ')
		document.getElementById('gameinput').value = ""
		if (wordCount === gameTextArrLength){
			endTime = new Date();
			document.getElementById('gameinput').disabled = true;
			WPM = (gameText.length / 5) / (((endTime-startTime) / 1000) / 60);
			WPM = WPM.toString();
			WPM = WPM.substr(0,5);
			document.getElementById('wpm').innerHTML = 'WPM: ' + WPM;
			wordCount = 0;
		}
	}
}