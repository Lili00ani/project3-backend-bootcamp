const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create user database
  async insertUser(req, res) {
    const { email } = req.body;
    try {
      const output = await this.model.findOrCreate({
        where: { email: email, role: "user" },
      });
      return res.json(output);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = UsersController;
