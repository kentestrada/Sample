"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize;

    return queryInterface.createSchema("core").then(() => {
      const tableConfig = {
        schema: "core",
        tableName: "countries_census"
      };

      const countriesRelationConfig = {
        schema: "core",
        tableName: "countries"
      };

      const tableProps = {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        country_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: countriesRelationConfig,
            key: "id"
          }
        },
        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        min: {
          type: DataTypes.INTEGER,
        },
        max: {
          type: DataTypes.INTEGER,
        },
        census_date: {
          type: DataTypes.DATE,
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
      tableName: "countries_census"
    };

    return queryInterface.dropTable(tableConfig).then(() => {
      return queryInterface.dropTable(tableConfig);
    });
  }
};
