const express = require("express");
const router = express.Router();

class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/:eventId", this.controller.insertOne.bind(this.controller));
    return router;
  }
}

module.exports = BookingsRouter;
