const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send("CORS Proxy is running!");
});

// Proxy Endpoint
app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  request(
    { url, headers: { "User-Agent": "Mozilla/5.0" } },
    (error, response, body) => {
      if (error) return res.status(500).send("Error fetching URL");
      res.send(body);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
