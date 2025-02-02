"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transactionData = require("../data/transactionData.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    });
    await queryInterface.bulkInsert("Transactions", transactionData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
