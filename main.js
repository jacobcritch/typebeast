var gameText =''
Reset();

function chooseText(){
	sel = Math.floor((Math.random() * 10) + 1)
	
	var phrases =
	{
		phrase1: 'The quick brown fox jumped over the long winding fence',
		phrase2: 'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn\'t so bad after all.',
		phrase3: 'Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn\'t and they don\'t recommend anyone else do it either.',
		phrase4: 'I was very proud of my nickname throughout high school but today- I couldn\'t be any different to what my nickname was.',
		phrase5: 'If the Easter Bunny and the Tooth Fairy had babies would they take your teeth and leave chocolate for you?',
		phrase6: 'What was the person thinking when they discovered cow\'s milk was fine for human consumption... and why did they do it in the first place!?',
		phrase7: 'This is the last random sentence I will be writing and I am going to stop mid-sent',
		phrase8: 'Sometimes it is better to just walk away from things and go back to them later when you\'re in a better frame of mind.',
		phrase9: 'She works two jobs to make ends meet; at least, that was her reason for not having time to join us.',
		phrase10: 'I am happy to take your donation; any amount will be greatly appreciated.'
	}
	
	switch(sel){
		case 1: if (gameText != phrases.phrase1) {return phrases.phrase1} else{chooseText()};
		case 2: if (gameText != phrases.phrase2) {return phrases.phrase2} else{chooseText()};
		case 3: if (gameText != phrases.phrase3) {return phrases.phrase3} else{chooseText()};
		case 4: if (gameText != phrases.phrase4) {return phrases.phrase4} else{chooseText()};
		case 5: if (gameText != phrases.phrase5) {return phrases.phrase5} else{chooseText()};
		case 6: if (gameText != phrases.phrase6) {return phrases.phrase6} else{chooseText()};
		case 7: if (gameText != phrases.phrase7) {return phrases.phrase7} else{chooseText()};
		case 8: if (gameText != phrases.phrase8) {return phrases.phrase8} else{chooseText()};
		case 9: if (gameText != phrases.phrase9) {return phrases.phrase9} else{chooseText()};
		case 10: if (gameText != phrases.phrase10) {return phrases.phrase10} else{chooseText()};
		default: {return phrases.phrase1}
	}
}

function Reset(){
	wordCount = 0;
	playing = false;
	$('#gameinput').fadeIn();
	document.getElementById('gameinput').value = "";
	gameText = chooseText();
	document.getElementById('gametext').innerHTML = gameText;
	gameTextArrOrg = gameText.split(" ");
	gameTextArr = gameText.split(" ");
	gameTextArrLength = gameTextArr.length;
	document.getElementById('gameinput').disabled = false;
	document.getElementById('wpm').innerHTML = 'WPM: ?'
	document.getElementById('wpm').style.fontSize = '';
}

function GameLoop(){	
	if (playing === false){playing = true; document.getElementById('gameinput').placeholder = ''; startTime = new Date();}
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
			$('#gameinput').fadeOut();
			WPM = (gameText.length / 5) / (((endTime-startTime) / 1000) / 60);
			WPM = WPM.toString();
			WPM = WPM.substr(0,5);
			document.getElementById('wpm').innerHTML = 'WPM: ' + WPM;
			document.getElementById('wpm').style.fontSize = '4rem';
			wordCount = 0;
		}
	}
}

