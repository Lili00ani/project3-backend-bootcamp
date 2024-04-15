const BaseController = require("./baseController");
const { Op, where } = require("sequelize");

class EventsController extends BaseController {
  constructor(
    model,
    adminModel,
    categoryModel,
    languageModel,
    venueModel,
    statusModel
  ) {
    super(model);
    this.adminModel = adminModel;
    this.categoryModel = categoryModel;
    this.languageModel = languageModel;
    this.venueModel = venueModel;
    this.statusModel = statusModel;
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
        where: { statusId: 2 },
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

  async deleteOne(req, res) {
    const { eventId } = req.params;
    try {
      const event = await this.model.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: true, msg: "Event not found" });
      }
      await event.destroy();
      return res.json({ success: true, msg: "Event deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOne(req, res) {
    const {
      title,
      description,
      languageId,
      categoryId,
      venueId,
      adminId,
      price,
      start,
      end,
      statusId,
      capacity,
      image_link,
    } = req.body;
    try {
      const newEvent = await this.model.create({
        title: title,
        description: description,
        languageId: languageId,
        categoryId: categoryId,
        venueId: venueId,
        adminId: adminId,
        price: price,
        start: start,
        end: end,
        statusId: statusId,
        capacity: capacity,
        image_link: image_link,
      });

      return res.json(newEvent);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllEventsOrganisedByOneAdmin(req, res) {
    try {
      const { adminId } = req.body;
      console.log(adminId);
      const output = await this.model.findAll({
        where: { adminId: adminId },
        include: [{ model: this.statusModel, as: "status" }],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = EventsController;
