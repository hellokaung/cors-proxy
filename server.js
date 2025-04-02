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

  // Set appropriate headers
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pipe the request directly to the response to handle binary data
  request
    .get(url)
    .on("error", (err) => {
      res.status(500).send("Error fetching the URL");
    })
    .pipe(res);
});

// Start server
app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
