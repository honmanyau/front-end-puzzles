import express from 'express';

// Setup
const app = express();

// Config
const port = process.env.PORT || 3001;

// Start server
app.listen(port, function() {
  console.log(`Your app is listening on port ${port}`);
});
