// Called when the user clicks on the page action icon. Retrieves the usernames of both combatants and the tier of the battle.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message == "getInfo" ) {
	  var answer = new Array();
	  var player = $( "div.leftbar strong" ).get(); // This is where your name is stored in the page DOM
      var opponent = $( "div.rightbar strong" ).get(); // This is where the opponent's name is stored in the page DOM
	  answer[0] = player[0].innerText;
      answer[1] = opponent[0].innerText;
	  var tier = window.location.pathname; // Get the tier from the url because that is easier
	  answer[2] = tier.slice(8, tier.lastIndexOf("-")); // Cut out the first 8 characters ("/battle-") then end the slice at the last index of "-" to get the tier
	  console.log(answer[0]); // I removed all the console.logs and it broke the script, so don't touch them.
	  console.log(answer[1]);
	  console.log(answer[2]);
      chrome.runtime.sendMessage({"info": answer}); // Return the array with all the relevant battle info inside of it
    }
  }
);