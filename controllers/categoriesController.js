const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, languageModel, statusModel) {
    super(model);
    this.languageModel = languageModel;
    this.statusModel = statusModel;
  }

  async getAllCategories(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllLanguages(req, res) {
    try {
      const output = await this.languageModel.findAll();
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllStatuses(req, res) {
    try {
      const output = await this.statusModel.findAll();
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
