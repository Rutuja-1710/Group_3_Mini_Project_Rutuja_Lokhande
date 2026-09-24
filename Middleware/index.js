const express = require("express");
const fs = require("fs");
const path = require("path");
const visitCounter = require("./middleware/visitCounter");

const app = express();
const PORT = 5000;


app.use(visitCounter);

app.get("/home", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the Home page" });
});

app.get("/about", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the About page" });
});

app.get("/contact", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the Contact page" });
});


app.get("/visits", (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "visits.json"), "utf-8")
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not read visit data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
