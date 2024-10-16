const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Use the json-server router
server.use('/api', router);

// Serve your Angular build files (from 'dist' folder)
server.use(express.static(path.join(__dirname, 'dist')));

server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
