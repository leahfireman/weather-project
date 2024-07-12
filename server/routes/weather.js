const express = require('express');
const axios = require('axios');
const router = express.Router();

//should be in .env
const apiKey = "975dfecd1bff4fcc80314547241007";



router.get('/forecast/:location', async (req, res) => {
  try {
    const results = await getForecast(req.params.location);
    res.json(results);
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
    res.status(500).json({ error: "Failed to fetch weather forecast" });
  }
});


router.get('/search/:location', async (req, res) => {
  try {
    const results = await getLocationSearch(req.params.location);
    res.json(results);
  } catch (error) {
    console.error("Error searching location:", error.message);
    res.status(500).json({ error: "Failed to search location" });
  }
});


async function getForecast(location) {
  const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`);
  return { data: response.data };
}

async function getLocationSearch(location) {
  const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`);
  return { data: response.data };
}

module.exports = router;
