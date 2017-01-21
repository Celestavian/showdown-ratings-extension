chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) { // This is triggered when the background script sends the ratings:
	document.getElementById("playerRating").innerText = request.ratings[0]; // Replace the rating field with your rating
	document.getElementById("oppRating").innerText = request.ratings[1]; // Replace the rating field with your opponent's rating
  }
);

// Called when the user clicks on the page action icon to look at the opponent's rating.
document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage({"message": "getRating"}); // Start the process of fetching the rating by signaling to the background script to do so.
});