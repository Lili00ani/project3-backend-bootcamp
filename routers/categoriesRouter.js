const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAllCategories.bind(this.controller));

    return router;
  }
}

module.exports = CategoriesRouter;
