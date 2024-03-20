"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("admins", [
      {
        name: "Siglap South CC",
        description: "",
        email: "PA_SIGLAPSOUTHCC@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tanjong Pagar CC",
        description: "",
        email: "pa_tanjongpagarcc@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Buona Vista CC",
        description: "",
        email: "pa_buonavistacc@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Henderson CC",
        description: "",
        email: "pa_hendersoncc@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kreta Ayer CC",
        description: "",
        email: "pa_kretaayercc@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Geylang Serai CC",
        description: "",
        email: "pa_geylangseraicc@pa.gov.sg",
        image_link: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
