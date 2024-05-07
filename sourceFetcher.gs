//Stores API, UI, SHEET
var api_key_SerpAPI = ''; // ENTER SERP API KEY HERE
var ui = SpreadsheetApp.getUi();
var sheet = SpreadsheetApp.getActiveSheet();


function onOpen() {
  //Creates a menu with the 'Find Source' button
  ui.createMenu('Source Finder')
      .addItem('Find Sources', 'addSource')
      .addToUi();
}

function addSource() {

  // Stores the length of the sheet
  var lengthOfSheet = sheet.getDataRange().getValues().length;

  // Stores the column with the name, price, brand and destination
  var namePos = ui.prompt('Enter Column With Names').getResponseText();
  var pricePos = ui.prompt('Enter Column With Price').getResponseText();
  var destPos = ui.prompt('Enter Column To Write To').getResponseText();
  var percentage = parseFloat(ui.prompt('Enter Percent Range Price Can Vary').getResponseText());
  
  // Goes through every product, tries to find a source, and writes the source or lack there of
  for (var i = 1; i <= lengthOfSheet; i++) {
    
    // Stores the name and price of the product to be sourced
    var name = sheet.getRange(namePos + i).getValue();
    var targetPrice = parseFloat(sheet.getRange(pricePos + i).getValue());

    // Stores the source
    var source = fetchSources(targetPrice, percentage, name);

    // Stores the cell we write the source to
    var dest = sheet.getRange(destPos + i);

    // Writes the source of lack of to the Google Sheet
    dest.setValue(source);
  }
}

function fetchSources(targetPrice, percentage, name) {
  // Sanitizes Query
  var sanitizedQuery = name.replace(/"/g,'');
  
  // Calls the SerpAPI for Google Shopping results
  var url = 'https://serpapi.com/search.json?engine=google_shopping&q=' + sanitizedQuery + '&api_key=' + api_key_SerpAPI;
  
  // Stores results in response, parses it into JSON result
  var response = UrlFetchApp.fetch(url, {muteHttpExceptions:true}).getContentText();
  var result = JSON.parse(response);
  
  // For every result, check if its within the price range and relevant to the desired product
  for(var i = 1; i < result['shopping_results'].length; i++) {
    
    // If criteria are met, return the link to the source
    if (checkCriteria(result['shopping_results'][i]['extracted_price'], targetPrice, percentage)) {
      return result['shopping_results'][i]['link'];
    }
  }

  //If criteria is never met, claim there is no source
  return 'No Source';
}

// CRITERIA CHECKER
function checkCriteria(productPrice, targetPrice, percentage) {
  // Calulates the upper and lower bounds of the price
  var upperBound = targetPrice * (1 + (percentage / 100));
  var lowerBound = targetPrice * (1 - (percentage / 100));

  // If the price is within percentage, return true
  if (productPrice < upperBound && productPrice > lowerBound) {
    return true;
  }

  //Return false if criteria is not met
  return false;
}
