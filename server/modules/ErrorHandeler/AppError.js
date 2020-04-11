var logger  = require('../logger/logger')
const APP_ERRORS = require('./AppErrors')

class AppError extends Error{
    constructor(errorMsg, status = null, errorObj = null){
        super(errorMsg)
        this.errorMsg = errorMsg
        this.status = status
        this.errorObj = errorObj
        // this.__logError()   
        this.__inform() 
    }

    static APP_ERRORS = APP_ERRORS

    __inform(){
        if(this.status === APP_ERRORS.ARGUMENT_ERROR){
            logger.warning('ZLY KURWA ARGUMENT','kurwa jego mac')
        }
        // if(this.errorMsg = 'detonate'){
        //     logger.status('SERVER','ERROR')
        // }
    }

    // podaje całek Stack Trace
    __logError(){
        //logger.error('ErrorHhandeler',JSON.parse(this))
        console.log(this)
    }

    __toJSON() {
        return {
          error: {
            status: this.status,
            message: this.errorMsg,
            stacktrace: this.stack
          }
        }
      }

}
module.exports = AppError



// function throwShit(){
//     throw new ErrorHandeler('blad',404)
// }

// try{
//     throwShit()

// }catch(err){
//     console.log('mam blad' + err)
// }

