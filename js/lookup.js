//Putting the character lookup url, with API key in a variable
var characterPath = "https://us.api.battle.net/wow/character/thrall/sacamanos?locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv";

//Using that variable to lookup the character name and log it into the console
$.getJSON(characterPath, function(fetchedCharacter){
	document.getElementById("namePlaceholder").innerHTML = fetchedCharacter.name;
	document.getElementById("serverPlaceholder").innerHTML = fetchedCharacter.realm;
	document.getElementById("classPlaceholder").innerHTML = fetchedCharacter.class;
	document.getElementById("racePlaceholder").innerHTML = fetchedCharacter.race;
	document.getElementById("levelPlaceholder").innerHTML = fetchedCharacter.level;
	document.getElementById("achievementPointsPlaceholder").innerHTML = fetchedCharacter.achievementPoints;
});