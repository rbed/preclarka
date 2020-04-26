import axios from "axios";

class UserService {
  static async get() {
    try {
      const doc = await axios.get("/api/addresses");
      return doc;
    } catch {}
  }
}

export default UserService;
