# showdown-ratings-extension
A Google Chrome extension that retrieves the ratings of both you and your opponent.

To use this extension, download the Showdown Player Ratings.crx file, then open up the Extensions menu in Chrome. Drag and drop the .crx file into that window, and then hit "Add Extension" when Chrome prompts you. Chrome will warn you that the app can read your browsing history, and I do not know why, but I assure you that I'm not snooping on your history. You can read through the source code provided if you want to be sure!

Once installed, you can click on the icon in the upper right hand corner (it looks like the PS! logo with a little ladder icon at the bottom right) while you are in a battle to get the ratings of both players involved. You can be a player or spectator in the battle, with the top rating corresponding to the player on the left, and the bottom rating corresponding to the player on the bottom. This should work on any PS! server, but I have not tested on every single one so there may be some problems on very obscure servers.

KNOWN ISSUE: Unregistered players cause the extension to fail to retrieve their rating. This is because the showdown website throws a 404 not found error when trying to fetch their ratings page. It still shows up fine in a browser despite that, but the extension can't get the page data. I have no idea why this happens, but does not seem like it is caused by this extension. 
