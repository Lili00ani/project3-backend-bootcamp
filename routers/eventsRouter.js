class EventsRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:eventId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = EventsRouter;
