const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Enable body-parser

const log = [];
const teams = [];

app.get("/log", (req, res) => {
  // Invert the array to have the latest entries on top
  const rlog = log.slice().reverse();
  const json = {
    log: rlog,
    teams: teams,
  };

  res.json(json);
});

app.post("/log", (req, res) => {
  const userName = req.query.userName || "Anonymous";
  const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });

  if (userName === "admin") {
    log.length = 0;
  } else {
    const entry = `${userName} ha premuto alle ${timestamp}!`;

    // Add the user to the teams array if not already present
    if (!teams.includes(userName)) {
      teams.push(userName);
    }

    log.push(entry);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
