const express = require('express');
const app = express();


// Serve static files from the "public" directory
app.use(express.static('public'));


app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
