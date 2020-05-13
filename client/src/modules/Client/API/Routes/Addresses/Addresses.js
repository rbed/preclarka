/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/addresses';

export default class Addresses {
    static GET_ADDRESSES = MAIN_PATH + '/';
    static GET_ADDRESS_BY_ID = MAIN_PATH + '/id/';
    static CREATE_ADDRESS = MAIN_PATH + '/';
    static UPDATE_ADDRESS = MAIN_PATH + '/id';
    static DELETE_ADDRESS_BY_ID = MAIN_PATH + '/id';
 }