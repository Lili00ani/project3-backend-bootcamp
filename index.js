const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// importing Routers
const EventsRouter = require("./routers/eventsRouter");
const authRoutes = require("./routers/authRoutes");

// importing Controllers
const EventsController = require("./controllers/eventsController");

// importing DB
const db = require("./db/models/index");

// initialising all the model name, to be updated.
const {
  admin,
  booking,
  category,
  event,
  image,
  language,
  payment,
  status,
  user,
  venue,
} = db;

// initializing Controllers (to be updated)
const eventsController = new EventsController(
  event,
  admin,
  category,
  language,
  venue
);

// inittializing Routers
const eventsRouter = new EventsRouter(eventsController).routes();

const PORT = process.env.PORT || 5000;
const app = express();

// Enable reading JSON request bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// enable and use router
app.use("/events", eventsRouter);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}!`);
});
