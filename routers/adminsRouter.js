const express = require("express");
const router = express.Router();

class AdminsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/", this.controller.insertUser.bind(this.controller));
    router.get("/", this.controller.getUser.bind(this.controller));
    router.put(
      "/:adminID",
      this.controller.updateUserName.bind(this.controller)
    );

    return router;
  }
}

module.exports = AdminsRouter;
