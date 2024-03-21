const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// importing Routers
const EventsRouter = require("./routers/eventsRouter");

// importing Controllers

// importing DB
const db = require("./db/models/index");

// initialising all the model name, to be updated.
const {} = db;

// initializing Controllers (to be updated)

// inittializing Routers

const PORT = process.env.PORT;
const app = express();

// Enable reading JSON request bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// enable and use router

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
