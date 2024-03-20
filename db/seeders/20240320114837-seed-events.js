"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("events", [
      {
        title: "Table Tennis",
        description:
          "Table tennis is a challenging sport. It calls for agility, mental acuity and speed. Every table tennis necessitates some form of calculation; where the opponent is likely to move and what type of serve to use. Simply put, it is a highly strategic game that challenges one to think fast on the feet. Participants will be taught the rules of the game, the order of play and how to have a good serve and return.",
        language_id: 1,
        category_id: 5,
        venue_id: 1,
        admin_id: 1,
        price: 140,
        date: new Date("2024-04-06"),
        duration_in_mins: 120,
        status_id: 2,
        capacity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Hatha Yoga",
        description:
          "Try Hatha yoga – the ancient Indian art of healing, toning and rejuvenating the body that is suitable for all walks of life. Challenge your strength and flexibility while experiencing inner peace, calm and harmony through basic yoga poses, breathing exercises and concentration.",
        language_id: 1,
        category_id: 5,
        venue_id: 3,
        admin_id: 3,
        price: 20,
        date: new Date("2024-04-15"),
        duration_in_mins: 60,
        status_id: 2,
        capacity: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Karaoke Club",
        description: "",
        language_id: 1,
        category_id: 8,
        venue_id: 2,
        admin_id: 2,
        price: 0,
        date: new Date("2024-04-16"),
        duration_in_mins: 120,
        status_id: 2,
        capacity: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Malay Cooking Class",
        description:
          "Whether you are a busy executive or a homemaker, you will find this workshop useful. You will pick up a variety of convenient and easy-to-prepare dishes which also happen to be healthy options to the normal diet.",
        language_id: 3,
        category_id: 1,
        venue_id: 3,
        admin_id: 3,
        price: 40,
        date: new Date("2024-04-09"),
        duration_in_mins: 120,
        status_id: 3,
        capacity: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Ceramic Art",
        description:
          "Participants will get to know the different types of clay. They will practise on simple clay structure moulding to express their creativity in clay modelling. Techniques like coiling, slab building, throwing, glazing and firing will be taught.",
        language_id: 1,
        category_id: 2,
        venue_id: 6,
        admin_id: 6,
        price: 140,
        date: new Date("2024-04-12"),
        duration_in_mins: 120,
        status_id: 2,
        capacity: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
