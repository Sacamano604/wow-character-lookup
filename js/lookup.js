
var characterLookup = function(characterLookupName, characterLookupServer){
	$('#resultsDisplay').css('display', 'none');
	$('#searchingBox').css('display', 'flex');
	$('#error').html('');
	//Putting the character lookup url, with API key in a variable
	//Please don't use my API key :) They're free and easy to get
	var characterPath = 'https://us.api.battle.net/wow/character/' + characterLookupServer + '/' + characterLookupName + '?fields=achievements&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';
	//Because jsonp doesn't handle 404 callback errors we need to use a timeout function to handle the error.
	//If the json doesn't return with a valid array within 3 seconds we'll display an error
	//Start error handling by setting the success variable to true 
	var success = false;
	//Using that variable to lookup the character name and document write to ID's on the html page
	$.getJSON(characterPath, function(fetchedCharacter){
		//if we can find the character flag success as true and proceed
		success = true;
		//console.log(fetchedCharacter);
		//Using a switch to find the name of the class and not the actual number from the JSON
		var findClass = fetchedCharacter.class;
		switch(findClass){
			case 1:
				className = 'Warrior';
				classColor = '#C79C6E';
			break;
			case 2:
				className = 'Paladin';
				classColor = '#F58CBA';
			break;
			case 3:
				className = 'Hunter';
				classColor = '#ABD473';
			break;
			case 4:
				className = 'Rogue';
				classColor = '#FFF569';
			break;
			case 5:
				className = 'Priest';
				classColor = '#ffff00';
			break;
			case 6:
				className = 'Death Knight';
				classColor = '#C41F3B';
			break;
			case 7:
				className = 'Shaman';
				classColor = '#0070DE';
			break;
			case 8:
				className = 'Mage';
				classColor = '#69CCF0';
			break;
			case 9:
				className = 'Warlock';
				classColor = '#9482C9';
			break;
			case 10:
				className = 'Monk';
				classColor = '#00FF96';
			break;
			case 11:
				className = 'Druid';
				classColor = '#FF7D0A';
			break;
		}
		//Using a switch to find the name of the race and not the actual number from JSON
		var findRace = fetchedCharacter.race;
		switch(findRace){
			case 1:
				raceName = 'Human';
			break;
			case 2:
				raceName = 'Orc';
			break;
			case 3:
				raceName = 'Dwarf';
			break;
			case 4:
				raceName = 'Night Elf';
			break;
			case 5:
				raceName = 'Undead';
			break;
			case 6:
				raceName = 'Tauren';
			break;
			case 7:
				raceName = 'Gnome';
			break;
			case 8:
				raceName = 'Troll';
			break;
			case 9:
				raceName = 'Goblin';
			break;						
			case 10:
				raceName = 'Blood Elf';
			break;
			case 11:
				raceName = 'Draenei';
			break;
			case 22:
				raceName = 'Worgen';
			break;
			case 24:
				raceName = 'Pandaren (Neutral)';
			break;
			case 25:
				raceName = 'Pandaren (Alliance)';
			break;	
			case 26:
				raceName = 'Pandaren (Horde)';
			break;	
		}
		//Generates the image tag with the charcter's thumbnail portrait
		var imagePath = '<img src="http://render-api-us.worldofwarcraft.com/static-render/us/' + fetchedCharacter.thumbnail + '" />';
		//Finding out of the character is ahead of the curve or not
		var achievementSearch = fetchedCharacter.achievements.achievementsCompleted;
		var curve = achievementSearch.indexOf(10044);
		if (curve == -1) {
			$('#curveCheck').removeClass().addClass('glyphicon glyphicon-remove');
		} else {
			$('#curveCheck').removeClass().addClass('glyphicon glyphicon-ok');
		};
		//Pushing the JSON into the span placeholders
		$('#namePlaceholder').html(fetchedCharacter.name);
		$('#namePlaceholder').css('color', classColor);
		$('#serverPlaceholder').html(fetchedCharacter.realm);
		$('#classPlaceholder').html(className);
		$('#racePlaceholder').html(raceName);
		$('#levelPlaceholder').html(fetchedCharacter.level);
		$('#characterThumbnail').html(imagePath);
		// $('#achievementPointsPlaceholder').html(fetchedCharacter.achievementPoints);
		//results div is initially hidden, when the lookup occurs I have a 3 second time out before unhiding all the data
		//gives it time to gather the json data and assemble it
		//also hiding the div we display to show the user we're searching
		setTimeout(function(){
			$('#resultsDisplay').css('display', 'initial');
			$('#searchingBox').css('display', 'none');
				}, 3000);
			});
		//if the timeout occurs after 5 seconds, display the following error.
		setTimeout(function() {
			if (!success) {
				$('#resultsDisplay').css('display', 'none');
				$('#searchingBox').css('display', 'none');
				$('#error').html('Error, character not found');
					} }, 5000);
};
//Ensuring the reset button resets everything including the error from the previous lookup
var clearAll = function() {
	$('#error').html('');
	$('#namePlaceholder').html('');
	$('#serverPlaceholder').html('');
	$('#classPlaceholder').html('');
	$('#racePlaceholder').html('');
	$('#levelPlaceholder').html('');
	$('#achievementPointsPlaceholder').html('');
	$('#resultsDisplay').css('display', 'none');
};