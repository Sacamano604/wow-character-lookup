//Putting the character lookup url, with API key in a variable
//Please don't use my API key :) They're free and easy to get
var characterPath = "https://us.api.battle.net/wow/character/thrall/sacamanos?locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv";



//Using that variable to lookup the character name and document write to ID's on the html page
$.getJSON(characterPath, function(fetchedCharacter){
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

	document.getElementById("namePlaceholder").innerHTML = fetchedCharacter.name;
	document.getElementById("serverPlaceholder").innerHTML = fetchedCharacter.realm;
	document.getElementById("classPlaceholder").innerHTML = className;
	document.getElementById("racePlaceholder").innerHTML = fetchedCharacter.race;
	document.getElementById("levelPlaceholder").innerHTML = fetchedCharacter.level;
	document.getElementById("achievementPointsPlaceholder").innerHTML = fetchedCharacter.achievementPoints;


});