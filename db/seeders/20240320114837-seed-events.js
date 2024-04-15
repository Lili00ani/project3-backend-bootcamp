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
        start: new Date("2024-04-20T16:00:00"),
        end: new Date("2024-04-20T18:00:00"),
        status_id: 2,
        capacity: 10,
        image_link:
          "https://imgtr.ee/images/2024/04/14/e2dd8da66ca36f3bc7b32812d9c50d31.jpeg",
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
        start: new Date("2024-04-20T19:00:00"),
        end: new Date("2024-04-20T20:00:00"),
        status_id: 2,
        capacity: 15,
        image_link:
          "https://imgtr.ee/images/2024/04/14/c574a16a8a76eb916e008ef3ab31cb7c.jpeg",
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
        start: new Date("2024-04-18T20:00:00"),
        end: new Date("2024-04-18T22:00:00"),
        status_id: 2,
        capacity: 15,
        image_link:
          "https://imgtr.ee/images/2024/04/14/156aa4b235d6e1f452c276803c01bef3.jpeg",
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
        start: new Date("2024-04-29T10:00:00"),
        end: new Date("2024-04-29T15:00:00"),
        status_id: 3,
        capacity: 15,
        image_link:
          "https://imgtr.ee/images/2024/04/14/a059983c388541999cca2428364d66bf.jpeg",
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
        start: new Date("2024-04-22T10:00:00"),
        end: new Date("2024-04-22T16:00:00"),
        status_id: 2,
        image_link:
          "https://imgtr.ee/images/2024/04/14/589b7e8869fb4dddce7665aa174444af.jpeg",
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
