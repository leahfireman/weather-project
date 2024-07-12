// server.js
const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());

// Routes
app.use('/api/weather', require('./routes/weather'));

app.get("/", (req, res) => {
  const apiDetails = "http://localhost:5001/api/users";
  res.send({
    description: "Server is running, go to apiDetails to see API",
    apiDetails,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
