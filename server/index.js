/* SET UP AND IMPORTS */

// using Express to simplify code
const express = require("express");
const app = express();
app.use(express.json());

// using CORS since this will be a public website
const cors = require("cors");
app.use(cors());

// using specific database path and port
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

// use the database and routes as specified in those files
const dbo = require("./db/conn");
app.use(require("./routes/event"));

/* END OF SET UP AND IMPORTS */

// initialize server
app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.error(err);
    });
});