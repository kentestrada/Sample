import {
  Model,
  DataTypes,
  BuildOptions,
  ModelAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';

import { BaseModel, ITableConfig } from '../baseModel';
import { Country } from './country';

export interface ICountryCensus {
  id?: number;
  countryId?: number;
  value: number;
  min?: number;
  max?: number;
  censusDate: string;
}

export class CountryCensus extends BaseModel implements ICountryCensus {
  // =====
  // Model Properties
  // =====
  public id: number;
  public countryId: number;
  public value: number;
  public min: number;
  public max: number;
  public censusDate: string;

  static getAttributes(): ModelAttributes {
    return {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      name: {
        type: DataTypes.DATE,
        allowNull: false,
        field : 'census_date',
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    };
  }

  public static getValidationRules(): any {
    // Guide for validation Rules https://validatejs.org
    return {};
  }

  static getTableNameConfig(): ITableConfig {
    return {
      schema: 'core',
      tableName: 'countries_census',
    };
  }

  public static initAssociations(): void {
    // Define your model association here

    CountryCensus.belongsTo(Country, {
      foreignKey: 'countryId',
    });
  }
}
