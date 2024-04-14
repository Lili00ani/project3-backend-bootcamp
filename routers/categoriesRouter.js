const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAllCategories.bind(this.controller));
    router.get(
      "/languages",
      this.controller.getAllLanguages.bind(this.controller)
    );
    router.get(
      "/statuses",
      this.controller.getAllStatuses.bind(this.controller)
    );

    return router;
  }
}

module.exports = CategoriesRouter;
