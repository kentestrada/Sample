
import { Context } from 'koa';

import { ICustomAppContext, IJsonAPIQuery } from './../../typings';
import { Country } from './../../models/core';
import { BaseBreadController } from '../baseBreadController';
import { CountryTransformer } from './../../transformers';
import { CountryService } from './../../services/dbService';
import { ValidationService } from './../../services';
import { jsonAPIQUeryParser, paramsDeserializer } from '../../utilities/jsonAPITools';
import { MessageBag } from '../../utilities/messageBag';

// type alias for shortcut to trigger intellisense
type CustomContext = Context & ICustomAppContext;

export class CountryController extends BaseBreadController {

  constructor() {
    super(new CountryTransformer(), new CountryService, new ValidationService(Country));

    // set any of these variables to false as needed

    this.hasBrowse = false;
    // this.hasRead = true;
    // this.hasEdit = true;
    // this.hasAdd = true;
    // this.hasDelete = true;
  }

  public browse = async (ctx: CustomContext) => {

    const jsonApiQuery: IJsonAPIQuery = jsonAPIQUeryParser(ctx.query);
    const response = new MessageBag(this.transformer);

    const data = await this.service.findAllWithCensus(jsonApiQuery);

    response.meta = data.pagination;
    response.data = data.records;

    ctx.body = response.serialize();
  };

}
