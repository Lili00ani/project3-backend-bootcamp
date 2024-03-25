const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/:eventId", this.controller.insertOne.bind(this.controller));
    router.post(
      "/create-checkout-session/:eventId",
      this.controller.createCheckoutSession.bind(this.controller)
    );
    router.get(
      "/session-status",
      this.controller.getSessionStatus.bind(this.controller)
    );
    return router;
  }
}

module.exports = BookingsRouter;
