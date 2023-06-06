const express = require('express');
const app = express();
const port = 3000;

const titleRouter = require('./routes/title');

// Define routes
app.use('/I/want', titleRouter);


// Add a middleware function for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500);

  // Send the error response
  res.json({ error: 'Internal Server Error' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
