const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// importing Routers
const EventsRouter = require("./routers/eventsRouter");

// importing Controllers
const EventsController = require("./controllers/eventsController");

// importing DB
const db = require("./db/models/index");

// initialising all the model name, to be updated.
const { event, user, admin } = db;

// initializing Controllers (to be updated)
const eventsController = new EventsController(event, admin);

// inittializing Routers
const eventsRouter = new EventsRouter(eventsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable reading JSON request bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

// enable and use router
app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
