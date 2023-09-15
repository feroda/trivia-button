const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Enable body-parser

const log = [];

app.get("/log", (req, res) => {
    res.json(log);
});

app.post("/log", (req, res) => {
    const userName = req.body.userName; // Use req.body to access form data
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    if (userName === "admin") {
        log.length = 0;
    } else {
        const entry = `User ${userName} pressed the button at ${timestamp}`;
        log.push(entry);
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
