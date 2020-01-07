import {
  Serializer,
  Error,
  JSONAPIError,
  JSONAPIErrorOptions,
} from 'jsonapi-serializer';

import { IObjectTransformable } from '../typings';
import * as Inflector from 'inflected';

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export abstract class TransformableObjectAbstract
  implements IObjectTransformable {
  protected serializer: Serializer;
  private JSON_STANDARD_COMPLIANT: boolean = false;

  protected abstract objectType: string;
  protected abstract visibleFields: string[];

  constructor() {
    this.JSON_STANDARD_COMPLIANT = process.env.JSON_API_STANDARD_COMPLIANT === 'true';
  }

  public getObjectType(pluralize: boolean = false): string {
    let objectType = this.objectType;
    if (pluralize) {
      objectType = Inflector.pluralize(this.objectType);
    }

    return objectType;
  }

  transform(subject: any, meta?: any) {
    let result = {};

    // if object is empty or {}, do not use any serializer and return just the meta
    if (!subject && meta && Object.keys(meta).length > 0) {
      return { meta };
    }

    if (this.JSON_STANDARD_COMPLIANT) {
      this.serializer = new Serializer(this.objectType, {
        meta,
        attributes: this.visibleFields,
        keyForAttribute: 'camelCase',
      });

      result = this.serializer.serialize(subject);
    } else {
      result = subject.length > 0 ? subject.map((sub: any) => this.setVisibleFields(sub)) :
      this.setVisibleFields(subject);
    }

    return result;
  }

  transformError(errors: JSONAPIErrorOptions[]) {
    return new Error(errors);
  }

  private setVisibleFields(s: any, obj = {}) {
    this.visibleFields.map((f: any) => obj[f] = s[f]);
    return obj;
  }
}
