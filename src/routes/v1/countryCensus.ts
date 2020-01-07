import * as Router from 'koa-router';
// import controller = require('./controller');

import { BaseContext } from 'koa';

// authentication middleware
import { AuthService } from './../../services';
import { CountryCensusController } from '../../controllers/v1';
// const jwtMiddleware = AuthService.verifyTokenMiddleware();

const route = new Router({ prefix: '/census' });
const countryCtrl = new CountryCensusController();

route.get('/', countryCtrl.browse);
route.get('/:id', countryCtrl.read);
route.patch('/:id', countryCtrl.edit);
route.post('/', countryCtrl.add);
route.delete('/:id', countryCtrl.delete);

export { route as countryCensusRoute };
