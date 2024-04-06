const cors = require("cors");
const express = require("express");
const app = express();

const { auth } = require("express-oauth2-jwt-bearer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { auth: Auth0, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.FRONTEND_URL,
  clientID: process.env.AUTH0CLIENTID,
  issuerBaseURL: process.env.Auth0_URL,
  secret: process.env.JWT_SECRET,
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(Auth0(config));
// importing Routers
const EventsRouter = require("./routers/eventsRouter");
const authRoutes = require("./routers/authRoutes");
const BookingsRouter = require("./routers/bookingsRouter");

// importing Controllers
const EventsController = require("./controllers/eventsController");
const BookingsController = require("./controllers/bookingsController");

// importing DB
const db = require("./db/models/index");
//connecting db
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
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

const PORT = process.env.PORT || 5000;
//parsing cookies
app.use(cookieParser());

// Enable reading JSON request bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors({ credentials: true }));

// enable and use router
app.use("/events", eventsRouter);
app.use("/api/auth", authRoutes);
app.use("/bookings", bookingsRouter);

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}!`);
});
