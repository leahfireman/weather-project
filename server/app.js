// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes/index');
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(bodyParser.json());

// Route setup
app.use('/api', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
