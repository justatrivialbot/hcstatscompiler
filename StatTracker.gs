// Note: Apps Script automatically requests authorization
// based on the API's used in the code.

function getTwitchID() {
  var refsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SCNITwitch');
  var twitchApiOptions = {
    'headers': {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'ynufpr9ea8uxxmrzp1loab0gy0alxz'
    }
  };
  for (var i = 2; i < 23; i++) {
    var channelName = refsheet.getRange('B' + i).getValue();
    var idres = UrlFetchApp.fetch('https://api.twitch.tv/helix/users?login=' + channelName, twitchApiOptions);
    var jObj = JSON.parse(idres);
    var channelID = jObj.data[0].id;
    refsheet.getRange('C' + i).setValue(channelID);
  }
}

function getTwitchData() { // Pulls twitch data to Streaming Stats
  var refsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SCNITwitch');
  var datasheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Streaming Stats');
  var twitchApiOptions = {
    'headers': {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'YOUR API KEY HERE' // replace this with your own private key!!!
    }
  };
  for (var i = 2; i < 18; i++) {
    var Hermitname = refsheet.getRange('A' + i).getValue();
    var channelName = refsheet.getRange('B' + i).getValue();
    var streamYN = refsheet.getRange('D' + i).getValue();
    var idres = UrlFetchApp.fetch('https://api.twitch.tv/helix/users?login=' + channelName, twitchApiOptions);
    var jObj = JSON.parse(idres);
    var channelID = jObj.data[0].id;
    var totalviews = jObj.data[0].view_count;
    var datares = UrlFetchApp.fetch('https://api.twitch.tv/helix/users/follows?to_id=' + channelID, twitchApiOptions);
    var jObjdata = JSON.parse(datares);
    var followers = jObjdata.total;
    var vpf = parseInt(totalviews) / parseInt(followers);
    var datarow = [Hermitname, followers, totalviews, vpf, streamYN];
    datasheet.appendRow(datarow);
  }
  datasheet.appendRow(["Mixer User 1"]);
  datasheet.appendRow(["Mixer User 2"]);
  datasheet.appendRow(["Mixer User 3"]);
  datasheet.appendRow(["YT Streamer 1","Youtube"]);
  datasheet.appendRow(["YT Streamer 2","Youtube"]);
  datasheet.appendRow(["YT Streamer 3","Youtube"]);
  datasheet.sort(1);
}


function channelsListById(part, params, HermitName, CountryName) { // 2nd part of Youtube pull
  var response = YouTube.Channels.list(part, params);
  var channel = response.items[0];
  var vps = parseInt(channel.statistics.viewCount) / parseInt(channel.statistics.subscriberCount);
  var dataRow = [HermitName[0], channel.statistics.subscriberCount, channel.statistics.viewCount, vps, CountryName[0]];
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats').appendRow(dataRow);
}
                 
function getHermitData() { // First part of Youtube pull
  var refsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Channel Names and IDs');
  var resultsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats');
  var channelList = refsheet.getRange("B2:B23").getValues();
  var nameList = refsheet.getRange("D2:D23").getValues();
  var countryList = refsheet.getRange("E2:E23").getValues();
  for (var i=0; i < channelList.length; i++) {
    channelsListById('statistics',
                     {'id': channelList[i]}, 
                     nameList[i],
                    countryList[i]);
  }
}

function onOpen() { // runs on spreadsheet load, creates menu
  var firstCell = SpreadsheetApp.getActiveSheet().getRange(1, 1).getValue();
  if (firstCell != 'Hermit') {
    var headerRow = ["Hermit", "Subscribers", "Total Views", "Views per Subscriber", "Country"];
    SpreadsheetApp.getActiveSpreadsheet().appendRow(headerRow);
  }
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('YouTube Data')
  .addItem('Add channel data', 'getChannel')
  .addSeparator()
  .addItem('Get Twitch IDs', 'getTwitchID')
  .addItem('Pull Youtube data', 'getHermitData')
  .addItem('Pull Twitch data', 'getTwitchData')
  .addToUi();
}
