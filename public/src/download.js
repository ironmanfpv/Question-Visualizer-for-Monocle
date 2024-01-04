
async function listQuestionsAndWriteToFile() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1mpye5GhRQccaux4k-qsv46-wGTs2HpzTzZBkzuwVmNts',         /*insert your sheet ID*/
        range: 'Class Data!A2:D',                                              /*insert your sheet array*/
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
  
    const range = response.result;
    if (!range || !range.values || range.values.length === 0) {
      document.getElementById('content').innerText = 'No values found.';
      return;
    }
  
    // Formatting
      const jsonData = range.values.map((column, index) => {
      const formattedRow = column.join(' ');
      const words = formattedRow.split(/\s+/);
  
      let currentLine = '';
      let numOflines = 1;
      const formattedLines = [];
  
      for (const word of words) {
        if ((currentLine + word).length <= 25) {
          currentLine += word + ' ';
        } else {
          formattedLines.push(currentLine.trim());
          currentLine = word + ' ';
          numOflines++;
        }
      }
  
      if (currentLine.trim() !== '') {
        formattedLines.push(currentLine.trim());
      }
  
      return {
          Number: index + 1,
          numOflines,
          Question: formattedLines,
        };
    });
  
    // Write JSON data to a downloadable data.json
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   
  }
  