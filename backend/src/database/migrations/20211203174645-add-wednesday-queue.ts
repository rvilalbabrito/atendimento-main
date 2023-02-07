import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Queues", "wednesday", {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Queues", "wednesday");
  }
};
