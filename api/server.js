const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Use the json-server router under the /api endpoint
server.use('/api', router);

// Serve your Angular build files (from 'dist' folder)
server.use(express.static(path.join(__dirname, '../dist'))); // Adjusted to point to dist directory correctly

// Catch-all handler for HTML5 history API
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html')); // Adjusted to point to dist directory correctly
});

// Set the port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
