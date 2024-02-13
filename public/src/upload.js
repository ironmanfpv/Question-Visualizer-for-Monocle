
async function listQuestionsAndUpload() {
  let response;

  try {
    // Fetch data from the specified range in the Google Sheets spreadsheet
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1mpye5GhRQccaux4k-qsv46-wGTs2HpzTzZBkzuwVmNts', /*insert your sheet ID*/
      range: 'Class Data!A2:D',                                       /*insert your sheet array*/
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
    const questionAuthor = column[2]; // Assuming column[2] contains the question raiser's name

    const formattedLines = formatQuestionText(questionText);

    return {
      Number: questionNumber,
      numOflines: formattedLines.length,
      Question: questionAuthor ? formattedLines.concat(questionAuthor) : formattedLines, // With option for participant to be anonymous
    };
  });

  // Assuming myMonocle is already defined
  const jsonString = JSON.stringify(questions);
  var file = `import device; import os; f = open("data.json", "w"); f.write('${jsonString}'); f.close(); device.reset()`;
  myMonocle.repl(file);
}

function formatQuestionText(text) {
  const lines = [];
  let currentLine = '';

  for (const word of text.split(' ')) {
    if (currentLine.length === 0) {
      // First word in the line
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= 23) {
      // Add word to the current line with a space
      currentLine += ` ${word}`;
    } else {
      // Start a new line with the word
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine.length > 0) {
    // Add the last line if there are remaining words
    lines.push(currentLine);
  }

  // Adjust subsequent lines' max length to 25 characters
  for (let i = 1; i < lines.length; i++) {
    lines[i] = lines[i].substring(0, 25);
  }

  return lines;
}