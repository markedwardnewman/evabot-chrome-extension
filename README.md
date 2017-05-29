# chrome.extension.evabot

### 5/22/2017 - 5/29/2017 Notes
- Gmail will need to be reloaded after the extension has been installed.
- I simplified the entire thing, completely doing away with the popup toggle feature. It was causing too many issues and was overly complex to begin with. 
- The senders' first and last names are now automatically gathered via the user's primary gmail account. This greatly simplifies use, but issues will arise if the user's first and last name's don't match the values that are stored in Evabot's API.
- When the extension is installed, it automatically puts a 'Send Gift!' button to the right of the Gmail 'settings' drop-down. It is currently using the exact same classes that Gmail is using for their 'compose' button.
- The gift 'object' (created after the user clicks the modal's 'ok' button) contains gift exclusion values, but I don't currently see a way to pass that info to Evabot's API. Otherwise, all other requirements are passed. Please advise!
- sender_message and receiver_address are both currently hidden/not-being-used. Just say the word and I'll add them to the modal.
- PackID is currently set to 0. Not even sure what that is.
- Unless otherwise requested, I'll do any styling modifications just prior to the production release
- KNOWN ISSUES:
  - none!, er, at least and as far as prototypes go!
  - lots of goodie info found in console

  
### 5/10/2017 - 5/21/2017Notes
- Lots of researching Streak CRM, Nudge AI, and CoffeeSender, and how they integrate with Gmail
- Lots of researching LinkedIn and Salesforce, and how they integrate with Gmail
- Lots of testing with Gmail API and how to modify it
- Current version installs an Eva icon automatically.
  - Clicking that opens an options pop-up for turning on/off integration with  Gmail, Salesforce and LinkedIn (Yoinked from CoffeeSender).
  - Any selections here will be saved in chrome's local storage.
  - Enabling "Gmail" adds Eva integration to Gmail's banner (immediately to the right of the user's icon). It's currently linked to the Evabot demo as filler only.
- KNOWN ISSUES:
  - You must manually reload the page after enabling / disabling Gmail integration before any visual changes take place
  - The script that adds Eva integration to Gmail's banner is on a SetTimeOut, so it takes a few seconds before showing up
  - Previously working features will be reintegrated once all UI aspects have been approved
  - Reverse-engineering Streak, Nudge AI, and CoffeeSender's Chrome extension's source code revealed entire teams dedicated to their gmail integrations. Please expect any Salesforce and / or LinkedIn integrations to occur once the Gmail verison is working as intended.
  

### 5/05/2017 Notes
- Basic working version 1.1
- As per Ashish, made the extension a popup instead of a full page
- As per Ashish...
    - var API_url = API_root + token_number + '/' + name + '/' + email + '/' + subject + '/' + packID + '/' + price + '/' + address + '/' + message;
    + var API_url = API_root + token_number + '/' + name + '/' + email + '/' + subject + '/' + packID + '/' + price + '/' + (address == "" ? "+" : address) + '/' + (message == "" ? "+" : message);
- As of now, I see no apparent way to exclude certain gifts by passing info to the Gifts API.
- Styling to be done once functionality has been established as part of the last milestone. 

### 5/03/2017 Notes
- Basic working version 1.0 (without gift exclusions). **Please provide feedback asap!**
- See **[here](https://developer.chrome.com/extensions/getstarted#unpacked)** for how to install a dev / local version of a chrome extension
- Received API info on 5/01/2017
- On 5/02/2017, the Send Gift API was reporting a success regardless of the tokenNumber being used. No email was received. A quick chat with Ashish fixed it.

### 4/25/2017 Notes
- **Need Evabot API info!**
- See **[here](https://developer.chrome.com/extensions/getstarted#unpacked)** for how to install a dev / local version of a chrome extension
- See **[here](https://github.com/typicode/json-server)** for testing RESTful API JSON data using a local server
- So far, most of what you see are components that still need to be fit together. Need to meet and discuss.