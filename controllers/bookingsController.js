const { sequelize } = require("../db/models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BaseController = require("./baseController");
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const path = require("path");

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

      // console.log("CheckoutUser ID:", user_id);

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

      const event = await this.eventModel.findOne({ where: { id: eventId } });

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
      console.log(session.customer_details.email);
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: "gmail",
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER_APP_EMAIL,
          pass: process.env.USER_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: {
          name: "Event Link",
          address: process.env.USER_APP_EMAIL,
        },
        to: session?.customer_details?.email,
        subject: "Event Booking Email",
        text: "Your Event booking is done.",
        html: `
      <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>

    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }
      *[x-apple-data-detectors],
      .unstyle-auto-detected-links *,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }
      .im {
        color: inherit !important;
      }
      img.g-img + div {
        display: none !important;
      }
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }
      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }
    </style>
    <style>
      .primary {
        background: #32AD80;
      }
      .bg_white {
        background: #ffffff;
      }
      .bg_light {
        background: #fafafa;
      }
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }
      .email-section {
        padding: 2.5em;
      }

      .btn {
        padding: 10px 15px;
        display: inline-block;
      }
      .btn.btn-primary {
        border-radius: 5px;
        background: #237959;
        color: #ffffff;
      }
      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }
      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }
      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Lato", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      body {
        font-family: "Lato", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #237959;
      }

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: #237959;
        font-size: 24px;
        font-weight: 700;
        font-family: "Lato", sans-serif;
      }

      .hero {
        position: relative;
        z-index: 0;
      }

      .hero .text {
        color: rgba(0, 0, 0, 0.3);
      }
      .hero .text h2 {
        color: #000;
        font-size: 40px;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 1.4;
      }
      .hero .text h3 {
        font-size: 24px;
        font-weight: 300;
      }
      .hero .text h2 span {
        font-weight: 600;
        color: #237959;
      }

      .heading-section {
      }
      .heading-section h2 {
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
        font-weight: 400;
      }
      .heading-section .subheading {
        margin-bottom: 20px !important;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(0, 0, 0, 0.4);
        position: relative;
      }
      .heading-section .subheading::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: "";
        width: 100%;
        height: 2px;
        background: #237959;
        margin: 0 auto;
      }

      .heading-section-white {
        color: rgba(255, 255, 255, 0.8);
      }
      .heading-section-white h2 {
        line-height: 1;
        padding-bottom: 0;
      }
      .heading-section-white h2 {
        color: #ffffff;
      }
      .heading-section-white .subheading {
        margin-bottom: 0;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, 0.4);
      }

      ul.social {
        padding: 0;
      }
      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }
      .footer {
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.5);
      }
      .footer .heading {
        color: #000;
        font-size: 20px;
      }
      .footer ul {
        margin: 0;
        padding: 0;
      }
      .footer ul li {
        list-style: none;
        margin-bottom: 10px;
      }
      .footer ul li a {
        color: rgba(0, 0, 0, 1);
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <h1><a href="#">Event Booking</a></h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table>
                <tr>
                  <td>
                    <div
                      class="text"
                      style="padding: 0 2.5em; text-align: center"
                    >
                      <h2>Your Event booking is done.</h2>
            <h4>${event && event.title}</h4>
            <h4>Tickets bought: ${quantity_bought}</h4>
                      <h3>Contact Us for queries</h3>
                      <p>
                        <a
                          href="mailto:eventlink@gmail.com"
                          class="btn btn-primary"
                          >eventlink@gmail.com</a
                        >
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>

      `,
        attachments: [
          {
            filename: "../done.png",
            path: path.join(__dirname, "../done.png"),
            contentType: "image/jpg",
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
    // console.log(req?.body?.email);

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
        order: [[{ model: this.eventModel, as: "event" }, "start", "ASC"]],
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
