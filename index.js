const cors = require("cors");
const express = require("express");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

// importing Routers
const EventsRouter = require("./routers/eventsRouter");
const BookingsRouter = require("./routers/bookingsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");
const UsersRouter = require("./routers/usersRouter");
const VenuesRouter = require("./routers/venuesRouter");
const AdminsRouter = require("./routers/adminsRouter");

// importing Controllers
const EventsController = require("./controllers/eventsController");
const BookingsController = require("./controllers/bookingsController");
const CategoriesController = require("./controllers/categoriesController");
const UsersController = require("./controllers/usersController");
const VenuesController = require("./controllers/venuesController");
const AdminsController = require("./controllers/adminsController");

// importing DB
const db = require("./db/models/index");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
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
  venue,
  status
);
const bookingsController = new BookingsController(
  booking,
  event,
  payment,
  venue,
  user
);
const categoriesController = new CategoriesController(
  category,
  language,
  status
);
const usersController = new UsersController(user);
const venuesController = new VenuesController(venue);
const adminsController = new AdminsController(admin);

const eventsRouter = new EventsRouter(eventsController).routes();
const bookingsRouter = new BookingsRouter(bookingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();
const usersRouter = new UsersRouter(usersController).routes();
const venuesRouter = new VenuesRouter(venuesController).routes();
const adminsRouter = new AdminsRouter(adminsController).routes();

const PORT = process.env.PORT || 5000;
app.use(cookieParser());

app.use(express.json());
app.use(cors({ credentials: true }));
const jwtCheck = auth({
  audience: "https://eventlink/api",
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  algorithms: ["RS256"],
});

app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);
app.use("/venues", venuesRouter);
app.use("/admins", adminsRouter);

app.use(errorHandler);
app.use(notFound);
app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}!`);
});
