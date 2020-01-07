
import { Context } from 'koa';

import { ICustomAppContext } from './../../typings';
import { CountryCensus } from './../../models/core';
import { BaseBreadController } from '../baseBreadController';
import { CountryCensusTransformer } from './../../transformers';
import { CountryCensusService } from './../../services/dbService';
import { ValidationService } from './../../services';
import { MessageBag } from '../../utilities/messageBag';

// type alias for shortcut to trigger intellisense
type CustomContext = Context & ICustomAppContext;

export class CountryCensusController extends BaseBreadController {

  constructor() {
    // tslint:disable-next-line: max-line-length
    super(new CountryCensusTransformer(), new CountryCensusService, new ValidationService(CountryCensus));

    // set any of these variables to false as needed

    // this.hasBrowse = false;
    // this.hasRead = false;
    // this.hasEdit = true;
    // this.hasAdd = true;
    // this.hasDelete = true;
  }

  // public read = async (ctx: CustomContext) => {
  //   try {
  //     const response = new MessageBag(this.transformer);
  //     const data = await this.service.findCensusByCountryId(ctx.params.id);

  //     if (data) {
  //       response.data = data;
  //     } else {
  //       response.setNotFound();
  //     }

  //     ctx.body = data;
  //   } catch (err) {
  //     ctx.throw(500, err);
  //   }
  // };

}
