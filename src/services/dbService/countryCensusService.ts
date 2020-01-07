import { BaseDbService, IFindListResponse } from './baseDbService';

import { CountryCensus, Country } from './../../models/core';
import { BaseModel } from 'src/models/baseModel';
import { Op } from 'sequelize/types';
import { IJsonAPIQuery } from 'src/typings';

export class CountryCensusService extends BaseDbService {

  protected _primaryKeyAttribute = 'id';
  protected _defaultSearchField = 'value';

  constructor() {
    super(CountryCensus);
  }

  // tslint:disable-next-line: max-line-length
  public async findCensusByCountryId(primaryKey: number | string): Promise<BaseModel>  {
    const result = await this._model.findAll({
      include: [
        {
          model: Country,
        },
      ],
      where: {
        countryId: primaryKey || 1,
      },
    });
    return result;
  }

}
