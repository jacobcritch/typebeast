var gameText = '';
var wpmAttemptsArr = [];
var best = 0;
var avg = 0;
var sum = 0;
Reset();

function Reset(){
	wordCount = 0;
	playing = false;
	sum = 0;
	$('#gameinput').fadeIn();
	document.getElementById('gameinput').placeholder = 'Start typing to play...';
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
			wpmAttemptsArr.push(WPM);
			if (WPM > best){best = WPM;}
			for (i=0; i < wpmAttemptsArr.length; i++){
				sum += wpmAttemptsArr[i];
			};
			avg = sum/wpmAttemptsArr.length
			WPM = WPM.toString().substr(0,5);
			document.getElementById('wpm').innerHTML = 'WPM: ' + WPM;
			document.getElementById('best').innerHTML = 'Your best: ' + best.toString().substr(0,5);
			document.getElementById('average').innerHTML = 'Your average: ' + avg.toString().substr(0,5);
			document.getElementById('wpm').style.fontSize = '4rem';
			document.getElementById('gametext').innerHTML = 'Good job!';
			wordCount = 0;
		}
	}
}

function chooseText(){
	var phrases =
	{
		1: 'The quick brown fox jumped over the long winding fence',
		2: 'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn\'t so bad after all.',
		3: 'Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn\'t and they don\'t recommend anyone else do it either.',
		4: 'I was very proud of my nickname throughout high school but today- I couldn\'t be any different to what my nickname was.',
		5: 'If the Easter Bunny and the Tooth Fairy had babies would they take your teeth and leave chocolate for you?',
		6: 'What was the person thinking when they discovered cow\'s milk was fine for human consumption... and why did they do it in the first place!?',
		7: 'This is the last random sentence I will be writing and I am going to stop mid-sent',
		8: 'Sometimes it is better to just walk away from things and go back to them later when you\'re in a better frame of mind.',
		9: 'She works two jobs to make ends meet; at least, that was her reason for not having time to join us.',
		10: 'I am happy to take your donation; any amount will be greatly appreciated.',
	}
	var phrasesCount = 0;
	for (var i in phrases) phrasesCount++;
	sel = Math.floor((Math.random() * phrasesCount) + 1)
	return gameText != phrases[sel] ? phrases[sel] : chooseText();
}

