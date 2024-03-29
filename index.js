const cors = require("cors");
const express = require("express");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
// const cookieParser = require("cookie-parser");

// importing Routers
const EventsRouter = require("./routers/eventsRouter");
// const authRoutes = require("./routers/authRoutes");
const BookingsRouter = require("./routers/bookingsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");

// importing Controllers
const EventsController = require("./controllers/eventsController");
const BookingsController = require("./controllers/bookingsController");
const CategoriesController = require("./controllers/categoriesController");

// importing DB
const db = require("./db/models/index");
//connecting db
// (async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log("Database connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();
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
const categoriesController = new CategoriesController(category);

// inittializing Routers
const eventsRouter = new EventsRouter(eventsController).routes();
const bookingsRouter = new BookingsRouter(bookingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT || 5000;
const app = express();
//parsing cookies
// app.use(cookieParser());

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
// app.use("/api/auth", authRoutes);
app.use("/bookings", bookingsRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}!`);
});
