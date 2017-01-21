//Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains ...
          new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlContains: 'pokemonshowdown.com/battle'}
    })],
      // ... show the page action.
          actions: [new chrome.declarativeContent.ShowPageAction() ]
    }]);
	chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains ...
          new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlContains: 'psim.us/battle'}
    })],
      // ... show the page action.
          actions: [new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

var ratings = new Array();
var secondName;
var tier;

function getInfo(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Query the active tab and then send a message to the content script
        chrome.tabs.sendMessage(tabs[0].id, {"message": "getInfo"}); // Ask it to get the battle information we want
        });
    };
	
// This function is called once the first player's rating has been fetched, so that we guarantee that it is found first. If it were not found first, then 
// the first player's rating would be left out as the message that sends the ratings is sent out after the second player's rating is found.
function getOpponentData() {
	$.get('http://pokemonshowdown.com/users/' + secondName, function(responseText) {
		if (responseText.indexOf(tier) != -1) { // If the user is ranked in that tier:
			// Get the offset for the slice. Find the index of the tier, then add the length of the tier name.
			// Finally, add the magic number 43, which is the consistent gap between the end of the name of the tier and the beginning of its corresponding rating.
			var offset = responseText.indexOf(tier) + (tier.length) + 43;
			ratings[1] = responseText.slice(offset, offset + 4); // All ratings are 4 digits, as the minimum is 1000
		}
		else { // If they are not rated in that tier:
			ratings[1] = "Not Rated"; // Not using 1000 as the default here because there is a difference between being unrated and having a rating of 1000.
		}
		console.log(ratings); // I removed all the console.logs and it broke the script, so don't touch them.
		chrome.runtime.sendMessage({"ratings": ratings}); // Send to the popup script you and your opponent's ratings.
	});
};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
     if (request.message == "getRating") { // If this message came from popup.js:
        getInfo(); // Start the process of fetching the user's rating
     }
     else { // If this message is a response from the content script containing both players' names and the tier:
	    // Get the html data from the first player's showdown user page. Remove non-ASCII characters and spaces within the name first.
		console.log(request.info[0].replace(/[^0-9a-z]/gi, ""));
		console.log(request.info[1].replace(/[^0-9a-z]/gi, ""));
		secondName = request.info[1].replace(/[^0-9a-z]/gi, "").toLowerCase();
		tier = request.info[2];
		$.get('http://pokemonshowdown.com/users/' + request.info[0].replace(/[^0-9a-z]/gi, "").toLowerCase(), function(responseText) {
			if (responseText.indexOf(tier) != -1) { // If the user is ranked in that tier:
				// Get the offset for the slice. Find the index of the tier, then add the length of the tier name.
				// Finally, add the magic number 43, which is the consistent gap between the end of the name of the tier and the beginning of its corresponding rating.
				var offset = responseText.indexOf(tier) + (tier.length) + 43;
				ratings[0] = responseText.slice(offset, offset + 4); // All ratings are 4 digits, as the minimum is 1000
				getOpponentData();
			}
			else { // If they are not rated in that tier:
				ratings[0] = "Not Rated"; // Not using 1000 as the default here because there is a difference between being unrated and having a rating of 1000.
				getOpponentData();
			}
			console.log(ratings); // I removed all the console.logs and it broke the script, so don't touch them.
			
		});
	 }
});