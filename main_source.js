// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyAY2-U-wrArWEnxUiTAeoTbrJI0_qkCuTs",
	authDomain: "typebeast-f9c80.firebaseapp.com",
	databaseURL: "https://typebeast-f9c80.firebaseio.com",
	projectId: "typebeast-f9c80",
	storageBucket: "typebeast-f9c80.appspot.com",
	messagingSenderId: "968716336099",
	appId: "1:968716336099:web:d4ea07f043a5976198bed6",
	measurementId: "G-2BJQ9VB3RY"
};
// Initialize Firebase //
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var gameText = '';
var wpmAttemptsArr = [];
var best = 0;
var avg = 0;
var sum = 0;
leaderboardInit();
Reset();

function Reset(){
	wordCount = 0;
	playing = false;
	sum = 0;
	deleteScoreEntryForm();
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
	if (playing === false)
		{playing = true; 
		document.getElementById('gameinput').placeholder = ''; 
		startTime = new Date();}
	inputElement = document.getElementById('gameinput');
	input = inputElement.value;
	
	if ( (input === gameTextArr[0] + " ") || (input === gameTextArrOrg[gameTextArrLength-1] // If input === prompted word
	&& wordCount===gameTextArrLength-1) ) {
		wordCount += 1;
		gameTextArr.shift();
		document.getElementById('gametext').innerHTML = gameTextArr.join(' ');
		document.getElementById('gameinput').value = "";
		
		if (wordCount === gameTextArrLength){ // If game is over do =>
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
			displayScoreEntryForm()
		}
	}
}

function displayScoreEntryForm(){
	let lbInput = document.createElement('form');
	lbInput.setAttribute('id', 'lbInput');
	lbInput.setAttribute('onsubmit', 'scoreFormSubmit(this.name.value); return false;')
	lbInput.innerHTML = 
	'<input type="text" name="name"></input>						 \
	<input type="submit" value="Submit score"></input				 \
	'
	let lbInputLabel = document.createElement('label');
	lbInputLabel.setAttribute('id', 'lbInputLabel')
	lbInputLabel.innerHTML = '<h5>Enter your name to submit your best score for the leaderboard:</h5>';
	document.getElementById('gtwrapper').appendChild(lbInputLabel);
	document.getElementById('gtwrapper').appendChild(lbInput);
}

function deleteScoreEntryForm(){
	if (document.getElementById('lbInput')){
		document.getElementById('lbInput').outerHTML = "";
		}
	if (document.getElementById('lbInputLabel')){
		document.getElementById('lbInputLabel').outerHTML = "";
		}
}

function scoreFormSubmit(submittedName) {
	submittedName = sanitize(submittedName);
	submittedWPM = best.toString().substr(0,5);
	firestore.collection("leaderboard").doc(submittedName.toString()).set({
		name: submittedName,
		wpm: submittedWPM,
	})
	.then(function() {
		deleteScoreEntryForm();
		//leaderboardInit();
	})
	.catch(function(error) {
		console.error("Error writing score.", error);
	});
	alert('Score of ' + WPM + ' submitted to leaderboard for: ' + submittedName)
}

function leaderboardInit(){
	let lb = document.getElementById('leaderboard');
	/*if (lb.rows.length > 1) {
		for (let i=0; i<=lb.rows.length; i++) {
			console.log(i)
			lb.deleteRow(i+1)
		}
	}*/
	var docsArr = [];
	var collectionSize;
	firestore.collection("leaderboard")
		.orderBy('wpm', 'desc').get().then(function(querySnapshot) {
			return new Promise(function(resolve, reject) {
			var collectionSize = querySnapshot.size;
			querySnapshot.forEach((doc) => {
				docsArr.push(doc.data())
				resolve(collectionSize); })
				//docsArr.sort((a, b) => (a.wpm > b.wpm) ? 1 : -1)
			})
		}).then(function(size) {
			//alert(size)
			//console.log(docsArr)
			//let lb = document.getElementById('leaderboard');
			if (lb.rows.length > 1) {
				for (let x=0; x<lb.rows.length; x++) {
					console.log(x)
					lb.deleteRow(x+1)
				}
			}
			for (let i=0; i<size; i++){
				//alert(i)
				let lbrow = lb.insertRow(i+1);
				let cell1 = lbrow.insertCell(0);
				let cell2 = lbrow.insertCell(1);	
				let cell3 = lbrow.insertCell(2);
				cell1.innerHTML = i+1;
				cell2.innerHTML = docsArr[i]['wpm'];	
				cell3.innerHTML = docsArr[i]['name'];
			}
		}).catch(function(error) {
				console.log("Error getting documents: ", error);
	});
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
		
		11: 'There should be a law that no ordinary newspaper should be allowed to write about art. The harm they do by their foolish and random writing it would be impossible to overestimate, not to the artist, but to the public, blinding them to all but harming the artist not at all.',
		
		12: 'It is necessary to fall in love... if only to provide an alibi for all the random despair you are going to feel anyway.',
		
		13: 'It is necessary to fall in love... if only to provide an alibi for all the random despair you are going to feel anyway.',
		
		14: 'The Christian leaders of the future have to be theologians, persons who know the heart of God and are trained - through prayer, study, and careful analysis - to manifest the divine event of God\'s saving work in the midst of the many seemingly random events of their time.',
		
		15: 'An Internet meme is a hijacking of the original idea. Instead of mutating by random change and spreading by a form of Darwinian selection, Internet memes are altered deliberately by human creativity. There is no attempt at accuracy of copying, as with genes, and as with memes in their original version.',
		
		16: 'All of the Vines that were acted & setup & had nice cameras, those weren\'t the good Vines. The good Vines were, like, a random little kid in the middle of a forest, like, yelling.',
		
		17: 'I don\'t believe that if you do good, good things will happen. Everything is completely accidental and random. Sometimes bad things happen to very good people and sometimes good things happen to bad people. But at least if you try to do good things, then you\'re spending your time doing something worthwhile.',
		
		18: 'I\'ve done some really weird gigs. The ones where no one turned up - they\'re probably not the interesting ones to talk about. I played some pretty random ones in L.A. I signed to play all-R&B nights or an all-comedy night where I\'d be the only white person there. They were fun.',
		
		19: 'I have about a dozen cassettes lying about which I use in random order. Very often, I pick up a cassette to dictate a letter, and I find my voice coming back at me with the lines of plays three years old.',
		
		20: 'I was in art school, and we had all these random classes. We\'d listen to a lot of Bollywood. I\'d listen to Spanish music - and I don\'t even speak Spanish, but Hector Lavoe is amazing, we listened to French music like Edith Piaf. She\'s tight. I like cool vocal inflections; I like cool sounds. I pretty much listen to anything I think is good.',
		
		21: 'For years and hundreds of thousands of miles, I drove with one knee, with the eight-track and the light dome on in the car, and a yellow pad, just writing down random ideas. I had notebooks and notebooks. The next morning, I\'d go, \'Whoa, what was I thinking?\' But there\'d be one or two ideas that weren\'t that bad.',
		
		22: 'My pet peeves are people touching me a lot. Random dudes grabbing me and slapping me across the back. They\'re not doing it on purpose, but it\'s like they forget I\'m a person. But you can\'t do anything about it. What are you going to do?',
		
		23: 'The world, when you look at it, it just can\'t be random. I mean, it\'s so different than the vast emptiness that is everything else, and even all the other planets we\'ve seen, at least in our solar system, none of them even remotely resemble the precious life-giving nature of our own planet.',
		
		24: 'Please bear in mind that my observations and thoughts are the outcome of my own unaided impulse and curiosity alone; for, besides myself, in our town there be no philosophers who practice this art, so pray, take not amiss my poor pen and the liberty I here take in setting down my random notions.',
		
		25: 'My job as an author, at least the way I think of it - is to make a story that is coded and puzzling enough to entice conversation and interpretation, but also to do the opposite: to make some things clear so that it is meaningful in some way, not just a random assemblage of ideas.',
	}
	var phrasesCount = 0;
	for (var i in phrases) phrasesCount++;
	sel = Math.floor((Math.random() * phrasesCount) + 1)
	return gameText != phrases[sel] ? phrases[sel] : chooseText();
}

function sanitize(string) {
	const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			"/": '&#x2F;',
	};
	const reg = /[&<>"'/]/ig;
	return string.replace(reg, (match)=>(map[match]));
}