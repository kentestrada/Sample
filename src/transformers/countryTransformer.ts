import { TransformableObjectAbstract } from './transformableObjectAbstract';
import { Country } from './../models/core';

export class CountryTransformer extends TransformableObjectAbstract {

  protected objectType = 'country';
  protected visibleFields = [
    'name',
    'series',
  ];

}
