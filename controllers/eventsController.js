const BaseController = require("./baseController");
const { Op } = require("sequelize");

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

  async searchByFilter(req, res) {
    const { keyword } = req.params;
    const { categories } = req.query;
    let output;
    try {
      const categoryFilter = categories ? { id: categories } : {};
      console.log(categoryFilter);

      const queryOptions = {
        include: [
          { model: this.adminModel, as: "admin" },
          { model: this.venueModel, as: "venue" },
          { model: this.languageModel, as: "language" },
          {
            model: this.categoryModel,
            as: "category",
            where: categoryFilter,
          },
        ],
      };

      if (keyword !== "all") {
        queryOptions.where = {
          title: { [Op.iLike]: `%${keyword}%` },
        };
        output = await this.model.findAll(queryOptions);
        console.log("first");
      } else {
        output = await this.model.findAll(queryOptions);
        console.log("second");
      }

      return res.json(output);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while searching by title.");
    }
  }

  // async bookmarkEvent(req, res) {
  //   const { eventId } = req.params;
  //   const { userId } = req.body;

  //   try {

  //   }
  // }
}

module.exports = EventsController;
