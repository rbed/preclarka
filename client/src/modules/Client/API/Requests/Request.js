import axios from "axios";


class Request {

    static async get(url) {
        try {
          const doc = await axios.get(url);
          // TODO: tu pownie trzeba zamienić to co przyszlo na PDO
          return doc;
        } catch {}
      }

      static async post(url, item){
          console.log("request - przekazany item do posta " + JSON.stringify(item));
        try {
          const doc = await axios.post(url, item);
          return doc;
        } catch (err) {
          console.log('error w request');
        }
      }
}

export default Request;