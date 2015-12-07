var characterLookup = function(characterLookupName, characterLookupServer){
	document.getElementById('error').innerHTML = "";
	//Putting the character lookup url, with API key in a variable
	//Please don't use my API key :) They're free and easy to get
	var characterPath = "https://us.api.battle.net/wow/character/" + characterLookupServer + "/" + characterLookupName + "?locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv";
	//Because jsonp doesn't handle 404 callback errors we need to use a timeout function to handle the error.
	//If the json doesn't return with a valid array within 3 seconds we'll display an error
	//Start error handling by setting the success variable to true 
	var success = false;

	//Using that variable to lookup the character name and document write to ID's on the html page
	$.getJSON(characterPath, function(fetchedCharacter){
		//if we can find the character flag success as true and proceed
		success = true;
		//Using a switch to find the name of the class and not the actual number from the JSON
		var findClass = fetchedCharacter.class;
		switch(findClass){
			case 1:
				className = "Warrior";
			break;
			case 2:
				className = "Paladin";
			break;
			case 3:
				className = "Hunter";
			break;
			case 4:
				className = "Rogue";
			break;
			case 5:
				className = "Priest";
			break;
			case 6:
				className = "Death Knight";
			break;
			case 7:
				className = "Shaman";
			break;
			case 8:
				className = "Mage";
			break;
			case 9:
				className = "Warlock";
			break;
			case 10:
				className = "Monk";
			break;
			case 11:
				className = "Druid";
			break;
		}
		//Using a switch to find the name of the race and not the actual number from JSON
		var findRace = fetchedCharacter.race;
		switch(findRace){
			case 1:
				raceName = "Human";
			break;
			case 2:
				raceName = "Orc";
			break;
			case 3:
				raceName = "Dwarf";
			break;
			case 4:
				raceName = "Night Elf";
			break;
			case 5:
				raceName = "Undead";
			break;
			case 6:
				raceName = "Tauren";
			break;
			case 7:
				raceName = "Gnome";
			break;
			case 8:
				raceName = "Troll";
			break;
			case 9:
				raceName = "Goblin";
			break;						
			case 10:
				raceName = "Blood Elf";
			break;
			case 11:
				raceName = "Draenei";
			break;
			case 22:
				raceName = "Worgen";
			break;
			case 24:
				raceName = "Pandaren (Neutral)";
			break;
			case 25:
				raceName = "Pandaren (Alliance)";
			break;	
			case 26:
				raceName = "Pandaren (Horde)";
			break;	
		}
		//Pushing the JSON into the span placeholders
		document.getElementById("namePlaceholder").innerHTML = fetchedCharacter.name;
		document.getElementById("serverPlaceholder").innerHTML = fetchedCharacter.realm;
		document.getElementById("classPlaceholder").innerHTML = className;
		document.getElementById("racePlaceholder").innerHTML = raceName;
		document.getElementById("levelPlaceholder").innerHTML = fetchedCharacter.level;
		document.getElementById("achievementPointsPlaceholder").innerHTML = fetchedCharacter.achievementPoints;
	
	});
		//if the timeout occurs after 3 seconds, display the following error.
		setTimeout(function() {
		    if (!success) {
		        document.getElementById("error").innerHTML = "Error, character not found";
		    } }, 3000);
};
