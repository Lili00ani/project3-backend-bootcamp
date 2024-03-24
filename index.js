const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// importing Routers
const EventsRouter = require("./routers/eventsRouter");
const BookingsRouter = require("./routers/bookingsRouter");

// importing Controllers
const EventsController = require("./controllers/eventsController");
const BookingsController = require("./controllers/bookingsController");

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
const bookingsController = new BookingsController(booking, event, payment);

// inittializing Routers
const eventsRouter = new EventsRouter(eventsController).routes();
const bookingsRouter = new BookingsRouter(bookingsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable reading JSON request bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// enable and use router
app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
