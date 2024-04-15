const BaseController = require("./baseController");

class VenuesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const { postal_code, address, lat, lng, country } = req.body;
    try {
      let venue = await this.model.findOne({
        where: { lat: lat, lng: lng },
      });

      if (!venue) {
        venue = await this.model.create({
          postal_code: postal_code,
          address: address,
          lat: lat,
          lng: lng,
          country: country,
        });
      }
      return res.json(venue);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = VenuesController;
