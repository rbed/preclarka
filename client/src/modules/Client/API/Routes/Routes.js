import Addresses from './Addresses/Addresses';
import Users from './Users/Users';
import CopywritersContract from './CopywritersContract/CopywritersContract'
import CopywritersInvoice from './CopywritersInvoice/CopywritersInvoice'

export default class ROUTES {
   constructor() {
      return this;
   }

   static Addresses = Addresses;
   static Users = Users;
   static CopywritersContract = CopywritersContract;
   static CopywritersInvoice = CopywritersInvoice;
   
}
