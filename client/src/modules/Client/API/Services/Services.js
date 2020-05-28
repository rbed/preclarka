import AddressesService from './AddressesService/AddressesService';
import OrdersService from './OrdersService/OrdersService';
import UsersService from './UsersSersice/UsersService'
import CopywriterContractService from './CopywritersContractService/CopywritersContractService'
import CopywriterInvoiceService from './CopywritersInvoiceService/CopywritersInvoiceService'
import RegisterService from './RegistrationService/RegistrationService'

export default class Services {
   static AddressesService = AddressesService;
   static OrdersService = OrdersService;
   static UsersService = UsersService;
   static CopywriterContractService = CopywriterContractService;
   static CopywriterInvoiceService = CopywriterInvoiceService;
   static RegisterService = RegisterService;
   
}
