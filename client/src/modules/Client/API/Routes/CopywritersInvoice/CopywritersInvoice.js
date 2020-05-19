/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/copywriters-invoice';

export default class Addresses {
    static GET_COPYWRITERS = MAIN_PATH + '/';
    static GET_COPYWRITERS_BY_ID = MAIN_PATH + '/id/';
    static CREATE_COPYWRITERS = MAIN_PATH + '/';
    static UPDATE_COPYWRITERS = MAIN_PATH + '/id';
    static DELETE_COPYWRITERS_BY_ID = MAIN_PATH + '/id';
 }