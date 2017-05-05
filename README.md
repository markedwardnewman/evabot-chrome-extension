# chrome.extension.evabot

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
