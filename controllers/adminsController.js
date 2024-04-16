const BaseController = require("./baseController");

class AdminsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create user database
  async insertUser(req, res) {
    const { email, name } = req.body;
    try {
      const output = await this.model.findOrCreate({
        where: { email: email },
        defaults: { name: name },
      });
      return res.json(output);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getUser(req, res) {
    const { email } = req.body;
    try {
      const output = await this.model.findOne({
        where: { email: email },
      });
      return res.json(output);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async updateUserName(req, res) {
    const { adminID } = req.params;
    const { newName } = req.body;
    try {
      const admin = await this.model.findOne({
        where: { id: adminID },
      });

      if (!admin) {
        return res.status(404).json({ error: true, msg: "Admin not found" });
      }

      admin.name = newName;
      await admin.save();

      return res.json({ success: true, msg: "Name updated successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = AdminsController;
