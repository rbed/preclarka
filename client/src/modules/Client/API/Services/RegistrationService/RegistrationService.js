import Request from '../../Requests/Request'
import API from '../../API'

export default class RegisterService {
    
    static async registerCopywriterInvoice(form){
        // console.log('jestem w client registerservice Invoice')
        return await Request.post(API.ROUTES.CopywritersInvoice.REGISTER,form)
    }
    
    static async registerCopywriterContract(form){
        console.log('jestem w client registerservice contract')
        return await Request.post(API.ROUTES.CopywritersContract.REGISTER,form)
    }

}