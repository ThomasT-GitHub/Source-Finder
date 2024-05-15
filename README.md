# __Source Finder__
A Google App Script tool to find sources to buy products in Google Sheets utilizing SerpApi.  

To utilize this tool you must first create a SerpApi account [here](https://serpapi.com/)!
## __How To Use__
### First, within Google Sheets, navigate to Extensions and select App Script  

![StepOne](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step1.gif)  

### Second, paste the sourceFetcher.gs into coding environment  

![StepTwo](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step2.gif)  

### Third, enter your API key from SerpApi and save  

![StepThree](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step3.gif)  

### Fourth, click on Source Finder, then Find Sources (You may have to authorize the application after clicking)  

![StepFour](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step4.gif)  

### Fifth, enter the position of the products, their respective prices, the destination to write to, and the percentage by which the price may vary  

![StepFive](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step5.gif)  

### Lastly, allow for the sources to be fetched (This takes some time)  

![StepSix](https://github.com/thomastrivino/Source-Finder/blob/main/ReadME-Images/step6.gif)  

## How it works
Tech used: Google App Script, SerpAPI

<img src="https://github.com/thomastrivino/Source-Finder/blob/main/Google_Apps_Script.svg.png" alt="html" width="60"/><img src="https://raw.githubusercontent.com/thomastrivino/Source-Finder/main/34724717.png" alt="js" width="60"/>  

To start, I outlined the design of the program. I decided to utilize Google Sheets for hosting the products and prices, employing Google Apps Script, a programming language designed for interacting with Google Workspace tools, to read from and write to this sheet. To retrieve listings for the products, I chose to parse data from Google Shopping. For this, I utilized SerpAPI, an API for web scraping search results.  

To implement this I created a bound script in a Google Sheet that would act as the list of the products and their prices. By creating a bound script, the app script knows which spreadsheet it is bound to and how to edit it. Then I created a SerpAPI account in order to gain access to the API that allows us to read the data found on Google Shopping.  

Subsequently, I developed an Apps Script to make a call to SerpAPI, including a query for the product, and retrieved a JSON of the search results. The script then searched through the JSON for items falling within the desired price range. If a suitable source was found, it recorded it in the original spreadsheet; otherwise, it indicated that no source was found.  

## Lessons Learned
Throughout this project, I encountered obstacles that prompted me to explore API implementation, specifically SerpAPI. Originally, I attempted to parse Google Shopping results using JavaScript's ```fetch()``` function. However, the resulting HTML proved difficult to parse. Consequently, I sought an alternative method, leading me to SerpAPI.  

This API enabled me to query Google Shopping and receive the data as JSON, facilitating more efficient processing due to the straightforward retrieval of critical information such as price and source using JSON indexing.  

## Whats next?
Moving forward, I plan to enhance the functionality of this program by incorporating image search capabilities instead of solely relying on text searches. This would enable a more comprehensive search for products, ensuring that if no source is found, it truly means there's no source to purchase the product from. Moreover, it would improve the accuracy of the program by mandating a similar image on the listing for comparison.  
