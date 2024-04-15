const express = require("express");
const router = express.Router();

class EventsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/",
      this.controller.getOngoingEventsWithAdmin.bind(this.controller)
    );
    router.post("/", this.controller.insertOne.bind(this.controller));
    router.get("/:eventId", this.controller.getOne.bind(this.controller));
    router.delete("/:eventId", this.controller.deleteOne.bind(this.controller));
    router.get(
      "/search/:keyword",
      this.controller.searchByFilter.bind(this.controller)
    );
    router.post(
      "/admin",
      this.controller.getAllEventsOrganisedByOneAdmin.bind(this.controller)
    );

    return router;
  }
}

module.exports = EventsRouter;
