import { TransformableObjectAbstract } from './transformableObjectAbstract';
import { CountryCensus } from './../models/core';

export class CountryCensusTransformer extends TransformableObjectAbstract {

  protected objectType = 'countryCensus';
  protected visibleFields = [
    'country',
    'series',
    'value',
    'max',
    'min',
    'censusDate',
  ];

}
