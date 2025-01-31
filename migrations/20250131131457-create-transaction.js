'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      transaction_number: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      marketing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Marketings',
          key: 'id'
        }
      },
      total_balance: {
        type: Sequelize.INTEGER
      },
      grand_total: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};