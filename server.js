const express = require("express");
const visitCounter = require("./Middleware/visitcounter");

const app = express();
const PORT = 3000;


app.use(visitCounter);

app.get("/", (req, res) => {
  res.send("Welcome to the Mini Project!");
});

app.get("/visits", (req, res) => {
  const data = require("fs").readFileSync("./visits.json", "utf8");
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

