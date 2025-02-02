"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let marketingData = require("../data/marketingData.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    });
    await queryInterface.bulkInsert("Marketings", marketingData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Marketings", null, {});
  },
};
