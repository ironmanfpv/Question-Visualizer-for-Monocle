
async function listQuestionsAndUpload() {

  let response;
  try {
    // Fetch data from the specified range in the Google Sheets spreadsheet
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1mpye5GhRQccaux4k-qsv46-wGTs2HpzTzZBkzuwVmNts',     // Insert YOUR OWN Google Sheets ID
      range: 'Class Data!A2:D',                                           // Sheet name and range (Column A to D)
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
    const questionNumber = index + 1;
    const questionText = column[1]; // Assuming column[1] contains the question text
    const questionAuthor = column[2]; // Assuming column[2] contains the author's name

    return {
      Number: questionNumber,
      numOflines: questionText.split('\n').length,
      Question: [
        `${questionNumber} ${questionText}`,
        questionAuthor,
      ]
    };
  });

  // Assuming myMonocle is already defined
  const jsonString = JSON.stringify(questions);
  var file = `import device; import os; f = open("data.json", "w"); f.write('${jsonString}'); f.close(); device.reset()`;
  myMonocle.repl(file);
}