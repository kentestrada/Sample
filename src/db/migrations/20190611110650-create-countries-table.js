"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize;

    return queryInterface.createSchema("core").then(() => {
      const tableConfig = {
        schema: "core",
        tableName: "countries"
      };

      const tableProps = {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      };

      return queryInterface.createTable(tableConfig, tableProps);
    });
  },

  down: (queryInterface, Sequelize) => {
    const tableConfig = {
      schema: "core",
      tableName: "countries"
    };

    return queryInterface.dropTable(tableConfig).then(() => {
      return queryInterface.dropTable(tableConfig);
    });
  }
};
