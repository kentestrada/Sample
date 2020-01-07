import { BaseDbService, IFindListResponse } from './baseDbService';

import { Country, CountryCensus } from './../../models/core';
import { IJsonAPIQuery } from 'src/typings';
import { BaseModel } from 'src/models/baseModel';

export class CountryService extends BaseDbService {
  protected _primaryKeyAttribute = 'id';
  protected _defaultSearchField = 'name';

  constructor() {
    super(Country);
  }

  public findAllWithCensus(options: IJsonAPIQuery): Promise<IFindListResponse> {
    const nomalizedOptions = this.normalizeOptions(options);
    const findAllQUery = this.prepareFindAllQuery(nomalizedOptions);

    return this._model
      .findAndCountAll({
        ...findAllQUery,
        include: {
          model: CountryCensus,
          attributes: {
            exclude: ['id', 'countryId', 'createdAt', 'updatedAt'],
          },
          as: 'series',
        },
      })
      .then((result: any) => {
        const pagination = { ...options };
        pagination.page.count = result.count;

        const records = result.rows.map((res) => {
          const series = res.dataValues.series.map((s: any) => {
            return {
              value: s.value,
              min: s.min,
              max: s.max,
              name: new Date(s.name).toDateString(),
            };
          });
          return {
            series,
            name: res.name,
          };
        });

        return {
          pagination,
          records,
        };
      });
  }

  public findByID(primaryKey: number | string): Promise<BaseModel> {
    return this._model.findOne({
      where: {
        id: primaryKey,
      },
      include: {
        model: CountryCensus,
        attributes: { exclude: ['id', 'countryId', 'createdAt', 'updatedAt'] },
        as: 'series',
      },
    });
  }
}
