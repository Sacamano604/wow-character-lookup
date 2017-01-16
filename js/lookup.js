// Server Lookup AutoComplete based on region chosen
$('#characterLookupRegion').change(function() {
	if($(this).val() == 'us') {
		$("#characterLookupServer").autocomplete({
 		   	source: usServers
		});
	} else {
		$("#characterLookupServer").autocomplete({
 		   	source: euServers
		});
	}
});

var characterLookup = function(characterLookupRegion, characterLookupServer, characterLookupName){
	$('#resultsDisplay').css('display', 'none');
	$('#searchingBox').css('display', 'flex');
	$('#error').html('');
	// Resetting the highmaul progression table on a fresh lookup so it doesn't append on top of rows that have already been appended
	// aka: avoiding one huge long table
	$("#normalHighmaul").find("tr:gt(0)").remove();
	$("#heroicHighmaul").find("tr:gt(0)").remove();
	$("#mythicHighmaul").find("tr:gt(0)").remove();
	// Resetting the blackrock foundry progression table on a fresh lookup so it doesn't append on top of rows that have already been appended
	// aka: avoiding one huge long table
	$("#normalBlackrock").find("tr:gt(0)").remove();
	$("#heroicBlackrock").find("tr:gt(0)").remove();
	$("#mythicBlackrock").find("tr:gt(0)").remove();	
	// Resetting the hellfire citadel progression table on a fresh lookup so it doesn't append on top of rows that have already been appended
	// aka: avoiding one huge long table
	$("#normalHellfire").find("tr:gt(0)").remove();
	$("#heroicHellfire").find("tr:gt(0)").remove();
	$("#mythicHellfire").find("tr:gt(0)").remove();	
	// Constructing lookup URL based on region
	var lookupURL = 'https://' + characterLookupRegion + '.api.battle.net/wow/character/';
	// Variables for the individual look ups I'll need to make
	var achievementLookup = lookupURL + characterLookupServer + '/' + characterLookupName + '?fields=achievements&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';
	var gearLookup = lookupURL + characterLookupServer + '/' + characterLookupName + '?fields=items&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';
	var progressionLookup = lookupURL + characterLookupServer + '/' + characterLookupName + '?fields=progression&locale=en_US&apikey=n4t8curd5mfeupxugkqa599r2wx2x9wv';

	var success = false;
	// Function to find out the character's current raid progression
	$.getJSON(progressionLookup, function(fetchedProgression){
		var success = true;
		// Setting the raid IDs into variables
		var highmaulId = 6996;
		var blackrockFoundryId = 6967;
		var hellfireCitadelId = 7545;
		// Iterating over the objects in for each loops
		$.each(fetchedProgression.progression, function(allRaids, eachRaidObject){
			$.each(eachRaidObject, function(eachRaid, raidObject){
				// Finding the progression for the Highmaul Raid
				if (raidObject.id == highmaulId){
 					$.each(raidObject.bosses, function(eachBoss, bossObject){
						$('#normalHighmaul').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.normalKills + '</td></tr>');
						$('#heroicHighmaul').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.heroicKills + '</td></tr>');
						$('#mythicHighmaul').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.mythicKills + '</td></tr>');
					});
				};
				// Finding the progression for the Blackrock Foundry Raid
				if (raidObject.id == blackrockFoundryId){
					$.each(raidObject.bosses, function(eachBoss, bossObject){
						$('#normalBlackrock').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.normalKills + '</td></tr>');
						$('#heroicBlackrock').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.heroicKills + '</td></tr>');
						$('#mythicBlackrock').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.mythicKills + '</td></tr>');
					});
				};
				// Finding the progression for the Hellfire Citadel Raid
				if (raidObject.id == hellfireCitadelId){
					$.each(raidObject.bosses, function(eachBoss, bossObject){
						$('#normalHellfire').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.normalKills + '</td></tr>');
						$('#heroicHellfire').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.heroicKills + '</td></tr>');
						$('#mythicHellfire').append('<tr><td>' + bossObject.name + '</td><td>' + bossObject.mythicKills + '</td></tr>');
					});
				};
			});
		});
	});		
	// Function to find whether they have a legendary ring or not, and to spit out it's current item level if they do.
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
	});
	// Function to find the characters details and whether they have the "Ahead of the curve" achievement.
	$.getJSON(achievementLookup, function(fetchedCharacter){
		//if we can find the character flag success as true and proceed
		success = true;
		//console.log(fetchedCharacter);
		//Using a switch to find the name of the class and not the actual number from the JSON
		var classes = {
    	1:  { name: 'Warrior', color: '#C79C6E' },
    	2:  { name: 'Paladin', color: '#F58CBA' },
	    3:  { name: 'Hunter', color: '#ABD473' },
	    4:  { name: 'Rogue', color: '#FFF569' },
	    5:  { name: 'Priest', color: '#ffff00' },
	    6:  { name: 'Death Knight', color: '#C41F3B' },
	    7:  { name: 'Shaman', color: '#0070DE' },
	    8:  { name: 'Mage', color: '#69CCF0' },
	    9:  { name: 'Warlock', color: '#9482C9' },
	    10: { name: 'Monk', color: '#00FF96' },
	    11: { name: 'Druid', color: '#FF7D0A' }
		};
		var characterClass = classes[ fetchedCharacter.class ];
		//Using a switch to find the race of the character
		var races = {
			1: {raceName: 'Human'},
			2: {raceName: 'Ord'},
			3: {raceName: 'Dwarf'},
			4: {raceName: 'Night Elf'},
			5: {raceName: 'Undead'},
			6: {raceName: 'Tauren'},
			7: {raceName: 'Gnome'},
			8: {raceName: 'Troll'},
			9: {raceName: 'Goblin'},
			10: {raceName: 'Blood Elf'},
			11: {raceName: 'Draenei'},
			22: {raceName: 'Worgen'},
			24: {raceName: 'Pandaren (Neutral)'},
			25: {raceName: 'Pandaren (Alliance)'},
			26: {raceName: 'Pandaren (Horde)'}
		}
		var characterRace = races[ fetchedCharacter.race ];
		//Generates the image tag with the charcter's thumbnail portrait
		var imagePath = '<img src="http://render-api-us.worldofwarcraft.com/static-render/us/' + fetchedCharacter.thumbnail + '" />';
		var amoryPath = '<a href="http://us.battle.net/wow/en/character/thrall/' + fetchedCharacter.name + '/advanced" target="_blank">Amory Link</a>';
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
		$('#namePlaceholder').css('color', characterClass.color);
		$('#classPlaceholder').html(characterClass.name);
		$('#amoryLink').html(amoryPath);
		$('#serverPlaceholder').html(fetchedCharacter.realm);
		$('#racePlaceholder').html(characterRace.raceName); 
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
