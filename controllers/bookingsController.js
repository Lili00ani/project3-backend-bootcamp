const { sequelize } = require("../db/models");
const { Op } = require("sequelize");
const BaseController = require("./baseController");

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
      const output = await this.model.findAll({
        where: {
          eventId: eventId,
          booking_status: "complete",
          // booking_status: { [Op.or]: ["Complete", "Open"] },
        },
      });

      //get all the ticket_bought row and sum them up
      let totalTicketsBought = 0;
      output.forEach((booking) => {
        totalTicketsBought += booking.quantity_bought;
      });

      //get event capacity
      const event = await Event.findByPk(eventId);
      const totalCapacity = event.capacity;

      // Calculate the available capacity
      const availableCapacity = totalCapacity - totalTicketsBought;

      return res.json({ availableCapacity: availableCapacity });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create a booking
  async insertOne(req, res) {
    const { eventId } = req.params;
    const { quantity_bought } = req.body;

    try {
      await sequelize.transaction(async (t) => {
        //check if tickets sufficient
        const booked = await this.model.sum("quantity_bought", {
          where: {
            eventId: eventId,
            booking_status: "open",
          },
          transaction: t,
        });

        //get event capacity
        const event = await this.eventModel.findByPk(eventId, {
          transaction: t,
        });

        // Check if there are enough tickets available
        const availableTickets = event.capacity - (booked || 0);
        if (quantity_bought > availableTickets) {
          throw new Error("Not enough tickets available");
        }

        //calculate total price user need to pay
        const total = quantity_bought * event.price;

        //create payment entry
        const payment = await this.paymentModel.create(
          {
            total: total,
            currency: "SGD",
            status: "open",
          },
          { transaction: t }
        );

        //create booking entry
        const booking = await this.model.create(
          {
            //next time update the user
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

        //create condition when payment status becomes complete, the booking status will automatically change to complete yoo
        //when payment status stays as "open" for 30 mins, booking status changed to cancel.

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
