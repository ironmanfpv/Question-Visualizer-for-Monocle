// TODO(developer/User): Set to client ID and API key from the Developer Console
const CLIENT_ID = 'ENTER-CLIENT-ID';                                /* To Key in OAuth 2.0 Client ID*/
const API_KEY = 'ENTER-API-KEY';                                    /* To Key in API key*/

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';
document.getElementById('connectBtn').style.visibility = 'hidden';
document.getElementById('DownloadBtn').style.visibility = 'hidden';
document.getElementById('UploadBtn').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded. Commence authorisation.
 **/
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 **/
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('authorize_button').innerText = 'Refresh';
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('connectBtn').style.visibility = 'visible';
    document.getElementById('DownloadBtn').style.visibility = 'hidden';  /*visible only after connect*/
    document.getElementById('UploadBtn').style.visibility = 'hidden';    /*visible only after connect*/

    await listQuestions();
  };
  
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 **/
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
    document.getElementById('connectBtn').style.visibility = 'hidden';         
    document.getElementById('DownloadBtn').style.visibility = 'hidden';
    document.getElementById('UploadBtn').style.visibility = 'hidden';  
    statusMsg.innerHTML = "Device Disconnected";
    statusMsg.style.color = "#FD2403";
  }
}

/****************************NEW LISTQUESTION() METHOD *********************************************/

async function listQuestions() {
  let response;
  try {
    // Fetch data from the specified range in the Google Sheets spreadsheet
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1mpye5GhRQccaux4k-qsv46-wGTs2HpzTzZBkzuwVmNts', // Google Sheets ID
      range: 'Class Data!A2:D', // Sheet name and range (Column A to D)
    });
  } catch (err) {
    // Handle errors by displaying the error message on the web page
    document.getElementById('content').innerText = err.message;
    return;
  }

  const range = response.result;

  // Check if there is no data in the specified range
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }

  // Reformat the data into a JSON object
  const questions = range.values.map((column, index) => {
    const questionText = column[1]; // Assuming column[1] contains the question text

    return {
      Number: index + 1,
      "Number of lines": questionText.split('\n').length,
      Question: questionText,
    };
  });

  // Display the formatted data on the web page//
  const output = questions.map((questionData) => {
    return `• Number: ${questionData.Number}\n  Number of lines: ${questionData["Number of lines"]}\n  Question:\n  ◦ ${questionData.Question.replace(/\n/g, '\n  ◦ ')}\n`;
  }).join('\n');
  document.getElementById('content').innerHTML = output;
}
/*********************************END OF METHOD************************************************** */