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

  // Retrieve specific event with all the details information
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

  //Update number of tickets available when user in the process of booking or after successfully booking
  // async updateEventCapacity(req, res) {
  //   const { eventId } = req.params;
  //   const { quantity_bought } = req.body;
  //   try {
  //     const output = await this.model.findByPk(eventId);
  //     output.available_capacity -= quantity_bought;
  //     await output.save();

  //     return res.json(output);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = EventsController;
