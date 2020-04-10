const HTTP_STATUS_CODES = require('http-status-codes')
const APP_ERRORS = require('./AppErrors')
const AppError = require('./AppError')

class ErrorHandeler{

    static APP_ERRORS = APP_ERRORS

    static HTTP_STATUS_CODES = HTTP_STATUS_CODES

    static hadle(res,error){
        if(error.status === APP_ERRORS.MONGO_ERROR){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error.errorMsg)
        }
        if(error.status === APP_ERRORS.ARGUMENT_ERROR){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error.errorMsg)
        }
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(error)
    }

        
    static async createError(errorMsg,status,errorObj){
        return new AppError(errorMsg,status,errorObj)
    }

}

module.exports = ErrorHandeler