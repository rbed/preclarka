import Routes from './Routes/Routes';
import Services from './Services/Services';
import Request from './Requests/Request';

/**
 * @description Gives access to API Routes Services and Authorized Request with (JWT)
 */
export default class API {
   /**
    * @static
    * @returns {Object}
    * @description Gives access to all API routes
    */
   static ROUTES = Routes;

   /**
    * @static
    * @returns {Object}
    * @description Returns API services objects
    */
   static SERVICES = Services;

   static REQUEST = Request;
}
