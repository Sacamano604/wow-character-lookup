Blizzard API Testing
====================

Working with the Blizzard API for fun to see what kind of information we can extract from there. Starting small and then hopefully building up to something I can put in front of people.

For now I'll use the API to look up World of Warcraft characters.

Dec 6th: Finalized initial setup. Looking up a specific character and displaying the information. Will add more functionality at a later date. For now using custom css but will probably bootstrap it soon. 

March 1-3rd, 2016: Been working on this a lot the last couple of days. Added functionality to find out whether the user has a certain achievement or not and displaying a check mark or cross. Pulling up the character thumbnail. Used some user feedback for when we're searching for a character so they're not in the dark. Lots of CSS/HTML editing, and file structure clean up.


Left to do:
	<ul>
		<li>Find the user's ring item level and display a 0 if we can't find one</li>
		<li>Search for their raid progress and build a table of bosses, different difficulties and kills</li>
	</ul>

Currently the ring item level and the raid boss kills are all static data

You're able to see a working demo here: http://www.bentoussi.com/blizzardapi/