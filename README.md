# hcstatscompiler
Google Apps Script for pulling subscriber/follower stats from Youtube and Twitch.

# Origins

This was first created to track Youtube subscribers and Twitch followers of the Hermitcraft SMP Minecraft server for use on reddit.

# Prerequisites

- Youtube API key. Since this script will be using Google Sheets you don't actually need to insert the key into the script.
- Twitch API key. The Client ID generated upon creation of a new application will need to be inserted in line 9 and 32 of StatTracker.gs.
- A Google Spreadsheet with 4 tabs, named and with columns as follows:

**Sheet 1: Stats**
- Username, Followers, Total Views, Views Per Subscriber, Country
- Leave all other rows blank and clear all but the header row every time you run the script.

**Sheet 2: Channel Names and IDs**
- Sort, Channel ID, Channel Name, Output Name, Countries
- This is the sheet you fill with your Youtube channel info. 
- Channel Name field is optional to help you remember the brand name of the channel.
- Output Name is captured by the script to render into the Stats table.
- Country of origin is just sugar.

**Sheet 3: Streaming Stats**
- Username, Followers, Total Views, Views per Subscriber, Streams Often?
- Again like Sheet 1, leave all but the header row blank every time you run the script.
- The script will add some extra rows for manual lookup of streamers who use Mixer or Youtube.

**Sheet 4: SCNITwitch**
- Output Name, Login Name, ID, Streams regularly?
- This will be used to pull the data you need and populate the Streaming Stats table.
- Initially you will want to leave the ID column empty. Fill in all the usernames for the Twitch channels you want to track, one row per channel, and then run the "Get Twitch IDs" method from the Youtube Data menu.

# Setup

- Enter your Twitch API key on lines 9 and 32.
- Obtain your Youtube channel IDs. This is the randomized string of numbers used as the absolute link to the channel. You can look them up using the built-in "Try this API" testbed at [Google's documentation for their Youtube API](https://developers.google.com/youtube/v3/docs/channels/list). Enter "id" in the part field and the natural language username in the forUsername field, then hit enter. The results you need will be returned at the bottom of the app in an id field as part of a JSON encoded string. Enter these results on the Channel Names and IDs tab in the Channel ID column.
- Obtain Twitch channel ids for each channel you want to track using the Get Twitch IDs option in the Youtube Data menu.
- If you would like to add blank rows for streamers on other services such as Mixer for manual lookup, replace "Mixer User 1" and "YT Streamer 1" etc with the names you want to appear.

# Using the Script

1. Blank the Stats and Streaming Stats sheets. If you want to shift the data to a new sheet for tracking delta that's fine.
2. Using the Youtube Data menu, select Pull Youtube data. The script will add rows to the Stats tab.
3. From the same menu select Pull Twitch data. The script will add rows to the Streaming Stats tab.
