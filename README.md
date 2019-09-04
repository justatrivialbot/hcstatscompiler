# hcstatscompiler
Google Apps Script for pulling subscriber/follower stats from Youtube and Twitch into Google Sheets.

# Origins

This was first created to track Youtube subscribers and Twitch followers of the Hermitcraft SMP Minecraft server for use on reddit.

# Prerequisites

- **Youtube API key.** Since this script will be using Google Sheets you don't actually need to insert the key into the script.
- **Twitch API key.** The Client ID generated upon creation of a new application will need to be inserted in line 9 and 27 of StatTracker.gs.
- A Google Spreadsheet with 4 tabs, named and with columns as follows (refer to sample "Hermitcraft Stats Youtube.xlsx"):

**Sheet 1: Stats**
- Hermit | Followers | Total Views | Views Per Subscriber | Country
- *Leave all other rows blank and clear all but the header row every time you run the script.*

**Sheet 2: Channel Names and IDs**
- Sort | Channel ID | Channel Name | Output Name | Countries
- *This is the sheet you fill with your Youtube channel info.*
- *Channel Name field is optional to help you remember the brand name of the channel, e.g. "Grian" vs "Xelqua".*
- *Output Name is captured by the script to render into the Stats table.*
- *Country of origin is just sugar.*

**Sheet 3: Streaming Stats**
- Hermit | Followers | Total Views | Views per Subscriber | Streams Often?
- *Again like Sheet 1, leave all but the header row blank every time you run the script.*
- *The script will add some extra rows for manual lookup of streamers who use Mixer or Youtube.*

**Sheet 4: SCNITwitch**
- Output Name | Login Name | ID | Streams regularly
- *This will be used to pull the data you need and populate the Streaming Stats table.*
- *Initially you will want to leave the ID column empty. Fill in all the usernames for the Twitch channels you want to track, one row per channel, and then run the "Get Twitch IDs" method from the Youtube Data menu.*

# First Run

- Enter your Twitch API key on lines 9 and 27.
- Obtain the Youtube channel IDs for each YT channel you want to track. This is the randomized string of numbers and letters used as the absolute link to the channel. You can look them up using the built-in "Try this API" testbed at [Google's documentation for their Youtube API](https://developers.google.com/youtube/v3/docs/channels/list). Enter "id" in the "part" field and the natural language username in the "forUsername" field, then hit enter. The results you need will be returned at the bottom of the app in an id field as part of a JSON encoded string. It will look something like "UCZ9x-z3iOnIbJxVpm1rsu2A". (which is the channel ID for Iskall85) Enter the IDs on the Channel Names and IDs tab in the Channel ID column. Yes you have to go one at a time. Fortunately you only have to do this once.
- Obtain Twitch channel ids for each channel you want to track using the Get Twitch IDs option in the Youtube Data menu.
- If you would like to add blank rows for streamers on other services such as Mixer for manual lookup, replace "Mixer User 1" and "YT Streamer 1" etc with the names you want to appear. In my case I had 16 Twitch users and 3 mixer users so it's just easier for me to pull the Mixer guys manually once a week instead of writing up a whole separate method.

# Using the Script

1. Blank all but the header rows of the Stats and Streaming Stats tabs. If you want to shift the data to a new sheet for tracking change over time that's fine.
2. The script will add a new menu to your Google sheet called Youtube data.
3. Using the Youtube Data menu, select Pull Youtube data. The script will add rows to the Stats tab.
4. From the same menu select Pull Twitch data. The script will add rows to the Streaming Stats tab.
