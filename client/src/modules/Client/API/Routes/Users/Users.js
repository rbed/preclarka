/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/users';

export default class Addresses {
    static GET_USERS = MAIN_PATH + '/';
    static GET_USERS_BY_ID = MAIN_PATH + '/id/';
    static CREATE_USERS = MAIN_PATH + '/';
    static UPDATE_USERS = MAIN_PATH + '/id';
    static DELETE_USERS_BY_ID = MAIN_PATH + '/id';
 }