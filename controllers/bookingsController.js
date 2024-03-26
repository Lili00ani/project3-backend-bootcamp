const { sequelize } = require("../db/models");
const { Op } = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BaseController = require("./baseController");
const BACKEND_URL = process.env.BACKEND_URL;

class BookingsController extends BaseController {
  constructor(model, eventModel, paymentModel) {
    super(model);
    this.paymentModel = paymentModel;
    this.eventModel = eventModel;
  }
  // get all the booking of one user

  // get all the bookings of a particular event for admin to view

  // cancel a booking

  //check number of tickets bought per event, maybe move to helpers function in the future?
  async getAvailableCapacity(req, res) {
    const { eventId } = req.params;
    try {
      const totalTicketsBought = await this.model.sum("quantity_bought", {
        where: {
          eventId: eventId,
          booking_status: "open",
          // booking_status: { [Op.or]: ["Complete", "Open"] },
        },
      });

      //get event capacity
      const event = await this.eventModel.findByPk(eventId);
      const totalCapacity = event.capacity;

      // Calculate the available capacity
      const availableCapacity = totalCapacity - totalTicketsBought;

      return availableCapacity;
    } catch (err) {
      console.log(err);
      throw new Error("Error calculating available capacity");
    }
  }

  //create a stripe checkout session
  async createCheckoutSession(req, res) {
    const { eventId } = req.params;
    const { quantity_bought } = 1;

    try {
      // Check if there are enough available tickets
      const availableCapacity = await this.getAvailableCapacity(req, res);
      if (quantity_bought > availableCapacity) {
        throw new Error("Not enough tickets available");
      }
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
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded",
        return_url: `http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}`,
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
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
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
  async insertOne(req, res) {
    const { eventId } = req.params;
    const { quantity_bought } = req.body;

    try {
      // Event price

      await sequelize.transaction(async (t) => {
        // Create payment entry
        const payment = await this.paymentModel.create(
          {
            total: 100,
            currency: "SGD",
            status: "open",
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
            booking_status: "open",
          },
          { transaction: t }
        );

        // Associate booking with payment
        await booking.setPayment(payment, { transaction: t });

        // Save booking
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
