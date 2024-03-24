const BaseController = require("./baseController");

class EventsController extends BaseController {
  constructor(model, adminModel, categoryModel, languageModel, venueModel) {
    super(model);
    this.adminModel = adminModel;
    this.categoryModel = categoryModel;
    this.languageModel = languageModel;
    this.venueModel = venueModel;
  }

  // Retrieve ongoing events with the associated admin for homepage
  async getOngoingEventsWithAdmin(req, res) {
    console.log(this.model);
    try {
      const output = await this.model.findAll({
        include: [{ model: this.adminModel, as: "admin" }],
        where: { statusId: 2 },
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific event
  async getOne(req, res) {
    const { eventId } = req.params;
    try {
      const output = await this.model.findByPk(eventId, {
        include: [
          { model: this.adminModel, as: "admin" },
          { model: this.venueModel, as: "venue" },
          { model: this.languageModel, as: "language" },
          { model: this.categoryModel, as: "category" },
        ],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create sighting
}

module.exports = EventsController;
