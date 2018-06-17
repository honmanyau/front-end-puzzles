import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/puzzle/:id/:resource', function(request, response) {
  let { id, resource } = request.params;
  let parentDir = __dirname.replace(/server$/, '');
  let path = `${parentDir}/${id}/server/${resource}`;

  response.sendFile(path);
});

// Start server
app.listen(port, function() {
  console.log(`Your app is listening on port ${port}`);
});
