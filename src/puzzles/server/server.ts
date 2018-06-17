import * as fs from 'fs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/puzzle/:id/:filename', function(request, response) {
  let { id, filename } = request.params;
  let puzzleServerDir = `${__dirname.replace(/server$/, '')}/${id}/server`;
  let configPath = `${puzzleServerDir}/fepconfig.json`;
  let resourcePath = `${puzzleServerDir}/${filename}`;

  fs.readFile(configPath, { encoding: 'utf8' }, function(error, data) {
    if (error) {
      throw error;
    }

    let config = JSON.parse(data);
    let { delay } = config[filename] || 0;

    setTimeout(function() {
      response.sendFile(resourcePath);
    }, delay);
  });
});

// Start server
app.listen(port, function() {
  console.log(`Your app is listening on port ${port}`);
});
