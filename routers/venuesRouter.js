const express = require("express");
const router = express.Router();

class VenuesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/", this.controller.insertOne.bind(this.controller));

    return router;
  }
}

module.exports = VenuesRouter;
