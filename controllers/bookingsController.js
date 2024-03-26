const { sequelize } = require("../db/models");
const { Op } = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BaseController = require("./baseController");
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

class BookingsController extends BaseController {
  constructor(model, eventModel, paymentModel) {
    super(model);
    this.paymentModel = paymentModel;
    this.eventModel = eventModel;
  }
  // get all the booking of one user

  // get all the bookings of a particular event for admin to view

  // cancel a booking

  //check number of tickets bought per event
  async getAvailableCapacity(req, res) {
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
      // throw new Error("Error calculating available capacity");
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //create a stripe checkout session
  async createCheckoutSession(req, res) {
    const { eventId } = req.params;
    const { quantity_bought } = req.body;

    try {
      // Event price
      const event = await this.eventModel.findByPk(eventId);

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

        return_url: `${FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}&eventId=${eventId}&quantity=${quantity_bought}`,
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

      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      const payment_intent = session.payment_intent;

      //check if payment intent is successful and whether have already store in database, if not insert new one
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
            req,
            res
          );
          return;
        }
      }
      res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //create a booking
  async insertOne(eventId, quantity_bought, payment_intent, req, res) {
    try {
      const event = await this.eventModel.findByPk(eventId);

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
            userId: 1,
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
}

module.exports = BookingsController;
