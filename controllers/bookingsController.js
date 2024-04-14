const { sequelize } = require("../db/models");
const { Op } = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BaseController = require("./baseController");
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

class BookingsController extends BaseController {
  constructor(model, eventModel, paymentModel, venueModel, userModel) {
    super(model);
    this.paymentModel = paymentModel;
    this.eventModel = eventModel;
    this.venueModel = venueModel;
    this.userModel = userModel;
  }
  // get all the booking of one user

  // get all the bookings of a particular event for admin to view

  // cancel a booking

  //check number of tickets bought per event
  async getAvailableCapacity(req, res, next) {
    const { eventId } = req.params;
    try {
      const totalTicketsBought = await this.model.sum("quantity_bought", {
        where: {
          eventId: eventId,
          booking_status: "complete",
          // booking_status: { [Op.or]: ["Complete", "Open"] },
        },
      });

      //get event capacity
      const event = await this.eventModel.findByPk(eventId);
      const totalCapacity = event.capacity;

      // Calculate the available capacity
      const availableCapacity = totalCapacity - totalTicketsBought;

      // return availableCapacity;
      res.json({ availableCapacity });
    } catch (err) {
      console.log(err);
      next(err);
      // throw new Error("Error calculating available capacity");
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //create a stripe checkout session
  async createCheckoutSession(req, res) {
    const { eventId } = req.params;
    const { quantity_bought } = req.body;
    const { user_id } = req.body;

    try {
      // Event price
      const event = await this.eventModel.findByPk(eventId);

      console.log("CheckoutUser ID:", user_id);

      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            price_data: {
              currency: "SGD",
              product_data: {
                name: event.title,
              },
              unit_amount: event.price * 100,
            },
            quantity: quantity_bought,
          },
        ],
        mode: "payment",
        ui_mode: "embedded",

        return_url: `${FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}&eventId=${eventId}&quantity=${quantity_bought}&user=${user_id}`,
      });
      res.send({ clientSecret: session.client_secret });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //handle success
  async getSessionStatus(req, res) {
    try {
      const eventId = req.query.eventId;
      const quantity_bought = req.query.quantity;
      const user = req.query.user;

      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      const payment_intent = session.payment_intent;
      console.log("eventId:", eventId);
      console.log("getSessionUser ID:", user);
      console.log("sessionStatus:", session.status);

      // Check if payment intent is successful and whether it's already stored in the database, if not, insert a new one
      if (session.status === "complete") {
        const payment = await this.paymentModel.findOne({
          where: {
            payment_intent: payment_intent,
          },
        });
        if (!payment) {
          await this.insertOne(
            eventId,
            quantity_bought,
            payment_intent,
            user,
            req,
            res
          );
          console.log("Payment inserted successfully");
        }
      }

      // Return the response with session status and payment status
      res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: true, msg: err.message });
    }
  }

  //create a booking
  //eventId, quantity_bought, payment_intent,
  async insertOne(eventId, quantity_bought, payment_intent, user, req, res) {
    try {
      eventId = parseInt(eventId);

      // Validate eventId
      if (isNaN(eventId)) {
        return res.status(400).json({ error: true, msg: "Invalid eventId" });
      }
      const event = await this.eventModel.findByPk(eventId);
      console.log(eventId);

      await sequelize.transaction(async (t) => {
        // Create payment entry
        const payment = await this.paymentModel.create(
          {
            total: event.price * quantity_bought * 100,
            currency: "SGD",
            status: "complete",
            payment_intent: payment_intent,
          },
          { transaction: t }
        );

        // Create booking entry
        const booking = await this.model.create(
          {
            userId: user,
            eventId: eventId,
            quantity_bought: quantity_bought,
            quantity_left: quantity_bought,
            booking_status: "complete",
          },
          { transaction: t }
        );

        // Associate booking with payment
        await booking.setPayment(payment, { transaction: t });

        // Save booking in database
        await booking.save({ transaction: t });
        // return res.json(booking);
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOneFree(req, res) {
    try {
      console.log(req.body);
      const { eventId, quantity_bought, payment_intent, user_id } = req.body;

      const event = await this.eventModel.findByPk(eventId);
      console.log(eventId);

      await sequelize.transaction(async (t) => {
        // Create payment entry
        const payment = await this.paymentModel.create(
          {
            total: event.price * quantity_bought * 100,
            currency: "SGD",
            status: "complete",
            payment_intent: payment_intent,
          },
          { transaction: t }
        );

        // Create booking entry
        const booking = await this.model.create(
          {
            userId: user_id,
            eventId: eventId,
            quantity_bought: quantity_bought,
            quantity_left: quantity_bought,
            booking_status: "complete",
          },
          { transaction: t }
        );

        // Associate booking with payment
        await booking.setPayment(payment, { transaction: t });

        // Save booking in database
        await booking.save({ transaction: t });
        return res.json(booking);
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOngoingBooking(req, res) {
    const { userId } = req.query;

    try {
      console.log("getOngoing user:", userId);
      const output = await this.model.findAll({
        include: [
          {
            model: this.eventModel,
            as: "event",
            where: {
              statusId: {
                [Op.or]: [2, 3, 4],
              },
            },
            include: [{ model: this.venueModel, as: "venue" }],
          },
        ],
        where: { userId: userId },
      });

      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getPastBooking(req, res) {
    const { userId } = req.query;

    try {
      const output = await this.model.findAll({
        include: [
          {
            model: this.eventModel,
            as: "event",
            where: {
              statusId: {
                [Op.or]: [5, 6],
              },
            },
          },
        ],
        where: { userId: userId },
      });

      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllBookingsForEvent(req, res, next) {
    const { eventId } = req.params;

    try {
      const bookings = await this.model.findAll({
        where: {
          eventId: eventId,
          booking_status: "complete",
        },
        include: [{ model: this.userModel, as: "user" }],
      });

      res.json({ bookings });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = BookingsController;
