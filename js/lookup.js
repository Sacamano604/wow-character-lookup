
var characterLookup = function(characterLookupName, characterLookupServer){
	$('#resultsDisplay').css('display', 'none');
	$('#searchingBox').css('display', 'flex');
	$('#error').html('');
	
	var achievementLookup = 'https://us.api.battle.net/wow/character/' + characterLookupServer + '/' + characterLookupName + '?fields=achievements&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';
	var gearLookup = 'https://us.api.battle.net/wow/character/' + characterLookupServer + '/' + characterLookupName + '?fields=items&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';
	
	var success = false;
	
	$.getJSON(gearLookup, function(fetchedItems){
		success = true;
		//Putting the ring ids into variables
		var ring1Id = fetchedItems.items.finger1.id;
		var ring2Id = fetchedItems.items.finger2.id;
		//Putting the ring item level into variables
		var ring1ItemLevel = fetchedItems.items.finger1.itemLevel;
		var ring2ItemLevel = fetchedItems.items.finger2.itemLevel;
		//Variables for the ring ids i'm searching for
 		var strDpsRing = 124634;
		var intDpsRing = 124635;
		var agiDpsRing = 124636;
		var tankRing = 124637;
		var healerRing = 124638;

		//If else to find if either of the rings match the legendary ring's items levels, and display 'No Ring' if they don't have one
		if (ring1Id == strDpsRing || ring1Id == intDpsRing || ring1Id == agiDpsRing || ring1Id == tankRing || ring1Id == healerRing) {
			$('#legRing').html(ring1ItemLevel);
		} else if (ring2Id == strDpsRing || ring2Id == intDpsRing || ring2Id == agiDpsRing || ring2Id == tankRing || ring2Id == healerRing) {
			$('#legRing').html(ring2ItemLevel);
		 } else {
			$('#legRing').html('No Ring');
		};


	// 	var ring1 = ring1Search.indexOf(strDpsRing);
	// 	var ring2 = 

	// 	if (fetchedItems.items.finger1.id || fetchedItems.items.finger2.id === strDpsRing || intDpsRing || agiDpsRing || tankRing || healerRing) {
	// 		console.log('yes ring');
	// 	} else {
	// 		console.log('no ring');
	// 	}

	// 	if (ring1 || ring2 == -1) {
	// 		console.log('no ring');
	// 	}
	// 		console.log('yes ring');
	// });
});
	//Using that variable to lookup the character name and document write to ID's on the html page
	$.getJSON(achievementLookup, function(fetchedCharacter){
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
		var aheadOfTheCurveAchievementId = 10044;
		var curve = achievementSearch.indexOf(aheadOfTheCurveAchievementId);
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
				}, 2000);
			});
		//if the timeout occurs after 5 seconds, display the following error.
		setTimeout(function() {
			if (!success) {
				$('#resultsDisplay').css('display', 'none');
				$('#searchingBox').css('display', 'none');
				$('#error').html('Error, character not found');
					} }, 3000);
		};
//Ensuring the reset button hides the results div and the error if it exists
var clearAll = function() {
	$('#error').html('');
	$('#resultsDisplay').css('display', 'none');
};