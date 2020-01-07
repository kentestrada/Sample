import * as Router from 'koa-router';
// import controller = require('./controller');

import { BaseContext } from 'koa';

// authentication middleware
import { AuthService } from './../../services';
import { CountryController } from '../../controllers/v1';
// const jwtMiddleware = AuthService.verifyTokenMiddleware();

const route = new Router({ prefix: '/country' });
const countryCtrl = new CountryController();

route.get('/', countryCtrl.browse);
route.get('/:id', countryCtrl.read);
route.patch('/:id', countryCtrl.edit);
route.post('/', countryCtrl.add);
route.delete('/:id', countryCtrl.delete);

export { route as countryRoute };
