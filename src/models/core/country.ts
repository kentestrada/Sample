import {
  Model,
  DataTypes,
  BuildOptions,
  ModelAttributes,
  HasOneGetAssociationMixin,
} from 'sequelize';

import { BaseModel, ITableConfig } from '../baseModel';
import { CountryCensus } from './countryCensus';

export interface ICountry {
  id?: number;
  gpd: string;
  censusDate: string;
}

export class Country extends BaseModel implements ICountry {
  // =====
  // Model Properties
  // =====
  public id: number;
  public gpd: string;
  public censusDate: string;

  static getAttributes(): ModelAttributes {
    return {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'countries',
    };
  }

  public static initAssociations(): void {
    // Define your model association here
    Country.hasMany(CountryCensus, {
      foreignKey: 'countryId',
      as: 'series',
    });
  }
}
