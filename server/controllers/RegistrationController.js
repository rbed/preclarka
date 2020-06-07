
const addressesServices = require('../services/addressesServices')
const copywritersContractsServices = require('../services/copywritersContractsServices')
const copywritersInvoicesServices = require('../services/copywritersInvoicesServices')
const usersService = require('../services/usersServices')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

class RegistrationController {

    /**
     * @async
     * @param {UserForm} user 
     * @private
     * @returns Correctly saved user :)
     * @throws MONGO_ERROR
     */
    static async __registerUser(user){  
        if(!user) {
            throw new AppError('nie podales pozycjonera', ErrorHandeler.APP_ERRORS.ARGUMENT_ERROR)
        }
        try{
            const doc = await usersService.create(user)
            return doc
        }catch(err){
            throw new AppError('MongoDB error', ErrorHandeler.APP_ERRORS.MONGO_ERROR)
        }
    }

    /**
     * @async
     * @param {AddressForm} address 
     * @private
     * @returns Correctly saved address :)
     * @throws MONGO_ERROR
     */
    static async __registerAddress(address) {
        //address
        if (!address) {
            throw new AppError('nie podales adresu', ErrorHandeler.APP_ERRORS.ARGUMENT_ERROR) 
        }
        try {
            const data = await addressesServices.create(address)
            return data
        } 
        catch(err) {
            throw new AppError('Mongo Error', ErrorHandeler.APP_ERRORS.MONGO_ERROR)
        }
    }
    
    static async * __registration_Generator(forms){
        console.log('step1')

        var user = await RegistrationController.__registerUser(forms.user)
        if(user){
            forms.copywriter.user = user._id
            yield user
        }
        else yield null

        // try{
        //     var user = await RegistrationController.__registerUser(forms.user)
        //     forms.copywriter.user = user._id
        //     yield user
        //     // TODO: a może tu zamiast try catch zrobić ify. Jezeli user sukces to yield jezeli nie to null przekazuje, wtedy może rollback zadziała
        // }catch(e){
        //     console.log('blad przy tworzeniu usera step1 ' + e)
        //     throw ('blad przy tworzeniu usera step1 ' + e)
        // }
        
        console.log('step2')

        const address =  await RegistrationController.__registerAddress(forms.address)
        if(address) {
            forms.copywriter.adres = address._id
            yield address
        } else yield null

        // try {
        //     const address =  await RegistrationController.__registerAddress(forms.address)
        //     forms.copywriter.adres = address._id
        //     yield address
        // }catch(e){
        //     throw e
        // }
        console.log('step3')
        if(forms.copywriter.pesel) {console.log('user umowa o dzielo')
            yield await copywritersContractsServices.create(forms.copywriter)
        } else {
            console.log('user firma')
            yield await copywritersInvoicesServices.create(forms.copywriter)
        }
    }

    static async registrationContract(req, res, err) {
        
        const forms = {
            user: req.body.user,
            address: req.body.address,
            copywriter: req.body.copywriter
        }

        console.log(forms)
        //copywritterInvoice
        if (!forms.copywriter) {
            return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera', AppError.ARGUMENT_ERROR)) 
        }
        try{
            console.log('jestem w traju')
            // const registration =  __registration_Generator(forms)
            const registration =  RegistrationController.__registration_Generator(forms)
            console.dir(registration)
            
            let userRegistration =  await registration.next()
            console.log('userRegistrationValue = ' + userRegistration.value)
            if(!userRegistration.value){
                return res.status(400).json({user:' user nie zostal stworzony',
                    address: 'proba stworzenia adrsu nie została podjęta bo nie stworzył się user',
                    copywriter:'copywriter nie został stworzony ponieważ nie stworzył się user'})
            }    
        
            let addressRegistration = await registration.next()
            console.log('addressRegistrationValue = ' + addressRegistration.value)
            if(addressRegistration.value === null){
                console.log('wykonuję usuwanie usera')
                usersService.delete(userRegistration.value._id)
                return res.status(400).json({user:userRegistration.value,
                    address: 'adres nie został stworozny',
                    copywriter:'copywriter nie został stworzony ponieważ nie stworzył się adres'})
            }    

            let copywriterRegistration = await registration.next()
            console.log("copywriterRegistration " + copywriterRegistration.value)
            if(!copywriterRegistration.value){
                usersService.delete(userRegistration.value._id)
                addressesServices.delete(addressRegistration.value._id)
                return res.status(400).json({user:userRegistration.value,
                    address: addressRegistration.value,
                    copywriter:'copywriter nie został stworzony'})
            }

            let done = await registration.next()
            if(done){
                console.log('info, ze rejestracja poszla pomyslenie - zaraz nastapi re.status')
                return res.status(200).json({user:userRegistration.value,
                    address:addressRegistration.value,
                    copywriter:copywriterRegistration.value})
            }
            
            /*
            // console.log('wchodze dpo tworzeniu copywriteracontracotwego')
            let user = await RegistrationController.__registerUser(forms.user)
            // console.log('to jest stworzony user ' + user)
            let address = await RegistrationController.__registerAddress(forms.address)
            // console.log('to jest stworzony adres ' + address)

                forms.copywriter.userId = user._id
            // tu koniec jeżeli user się nie stworzył

                forms.copywriter.addressId = address._id
                // w tym iejscu usuwam usera jeżeli adres się nie stworzył

            let copywriter = await copywritersContractsServices.create(forms.copywriter)
            // w tym miejscu usuwam adres i usera jeżeli copywriter sie niestworzył
            */
            //console.log('copywriter stworzony w registrationContract')
            // res.status(200).json({user:user,address:address,copywriter:copywriter})        
        }catch(e){
            return ErrorHandeler.handle(req,res,e)
        }
    }

    
    
    


    static async registrationInvoice(req, res, err) {
        // console.log('start registercontroller')
            const forms = {
                user: req.body.user,
                address: req.body.address,
                copywriter: req.body.copywriter
            }
            // const{forms} = req.body
            //copywritterInvoice
            if (!forms.copywriter) {
                return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera', ARGUMENT_ERROR)) 
            }

            try{
                console.log('jestem w traju invoice')
                // const registration =  __registration_Generator(forms)
                const registration =  RegistrationController.__registration_Generator(forms)
                console.dir(registration)
                
                let userRegistration =  await registration.next()
                console.log('userRegistrationValue = ' + userRegistration.value)
                if(!userRegistration.value){
                    return res.status(400).json({user:' user nie zostal stworzony',
                        address: 'proba stworzenia adrsu nie została podjęta bo nie stworzył się user',
                        copywriter:'copywriter nie został stworzony ponieważ nie stworzył się user'})
                }    
            
                let addressRegistration = await registration.next()
                console.log('addressRegistrationValue = ' + addressRegistration.value)
                if(addressRegistration.value === null){
                    console.log('wykonuję usuwanie usera')
                    usersService.delete(userRegistration.value._id)
                    return res.status(400).json({user:userRegistration.value,
                        address: 'adres nie został stworozny',
                        copywriter:'copywriter nie został stworzony ponieważ nie stworzył się adres'})
                }    
    
                let copywriterRegistration = await registration.next()
                console.log('copywriterRegistration.value ' + copywriterRegistration.value)
                if(!copywriterRegistration.value){
                    console.log('wykonuje usuwanie usera i adresu')
                    usersService.delete(userRegistration.value._id)
                    addressesServices.delete(addressRegistration.value._id)
                    return res.status(400).json({user:userRegistration.value,
                        address: addressRegistration.value,
                        copywriter:'copywriter nie został stworzony'})
                }
    
                let done = await registration.next()
                console.log(done)
                if(done){
                    return res.status(200).json({user:userRegistration.value,
                        address:addressRegistration.value,
                        copywriter:copywriterRegistration.value})
                }
            }catch(e){
                return ErrorHandeler.handle(req,res,e)
            }



        //     try{
        //         let user = await RegistrationController.__registerUser(forms.user)
        //         // console.log(user)
        //         let address = await RegistrationController.__registerAddress(forms.address)
    
    
        //             forms.copywriter.userId = user._id
        //             forms.copywriter.addressId = address._id

        //         const copywriter = await copywritersInvoicesServices.create(forms.copywriter)
        // //     return res.status(HTTP_STATUS.OK).json(data)
        //         console.log('copywriter stworzony w registrationInvoice')

        //         res.status(200).json({user:user,address:address,copywriter:copywriter})        
        //     }catch(e){
        //         return ErrorHandeler.handle(req,res,e)
        //     }
        
        
        // //user
        // const {body: { user }} = req;
  
        // if(!user) {
        //     return ErrorHandeler.handle(req, res, new AppError('nie podales pozycjonera', ARGUMENT_ERROR)) 
        // }
        // try{
        //     const doc = await usersService.create(user)
        //     return res.status(200).json(doc)
        // }catch(err){
        //     ErrorHandeler.handle(req, res, err) 
        // }
        
        // //copywritter invoice
        // const {body: { copywriterInvoice }} = req;
        // if (!copywriterInvoice) {
        //     return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera', ARGUMENT_ERROR)) 
        // }
        // try {
        //     const data = await copywritersInvoicesServices.create(copywriterInvoice)
        //     return res.status(HTTP_STATUS.OK).json(data)
        // } 
        // catch(err) {
        //     ErrorHandeler.handle(req, res, err)
        // }
    }
}

// static async function* __registration_Generator(forms){
//     console.log('step1')
//     try{
//         var user = await RegistrationController.__registerUser(forms.user)
//     }catch(e){
//         throw e
//     }
//     yield user
//     console.log('step2')
//     yield await RegistrationController.__registerAddress(forms.address)
//     console.log('step3')
//     yield await copywritersContractsServices.create(forms.copywriter)
// }



module.exports = RegistrationController; 