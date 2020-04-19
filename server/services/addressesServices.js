const mongoose = require("mongoose");
const Addresses = mongoose.model("Addresses");
const AppError = require("../modules/ErrorHandeler/AppError");

const { ARGUMENT_ERROR, MONGO_ERROR } = AppError.APP_ERRORS;

class AddressesServices {
  /**
   * @param {ObjectID} ObjectID of Addresses
   * @throws Error - Nie ma ID  || MongoDB Error!
   * @returns Addresses as per id
   * @async
   * x
   */
  static getByID(id) {
    console.log("id to: ", id);
    // if (!this.isValidId(id)) {
    //   throw new AppError("wez mnie z tym id", ARGUMENT_ERROR);
    // }
    return Addresses.findById(id)
      .then((doc) => {
        console.log("to jest doc: " + doc);
        return doc;
      })
      .catch((err) => {
        throw Error("brak id - blad ze zwyklej klasy error");
      });
  }

  static isValidId(id) {
    return (
      mongoose.Types.ObjectId.isValid(id) &&
      new mongoose.Types.ObjectId(id) === id
    );
  }
  /**
   *
   * @param {String} id
   * @throws lack of parameter || MongoDB Err
   * @returns Addresses depends on the given id
   * @async
   * x
   */
  static async getAll(id = null) {
    if (!id || id === null) {
      try {
        return await Addresses.find().exec();
      } catch (err) {
        throw new AppError("coś nie tak z baza danych", MONGO_ERROR, err);
      }
    }
    if (id) {
      try {
        return await this.getByID(id);
      } catch (err) {
        throw new AppError("ID niepoprawne", MONGO_ERROR);
      }
    }
  }

  /**
   * @param {object} address
   * @returns created address data
   * @throws Error if address data not recieved || mongoDB othervise or if address object has no enough data
   * x
   */
  static async create(address) {
    if (!address) {
      throw new AppError("brak adresu", ARGUMENT_ERROR);
    }
    const Address = new Addresses(address);
    return Address.save()
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        throw new AppError("blad mongodb", MONGO_ERROR, err);
      });
  }

    /**
   * @param {object} addresses
   * @returns created addresses data
   * @throws Error if addresses data not recieved || mongoDB othervise or if addresses object has no enough data
   * x
   */
  static async createMany(addresses) {
    if (!addresses) {
      throw new AppError("brak adresów", ARGUMENT_ERROR);
    }
    for(var i in addresses)
      await this.create(addresses [i]);
  }

  /**
   *
   * @param {Object} address
   * @throws Error if id of the address you want to update not exist or if Provided address object has no id
   * @returns updated address
   * @async
   * x
   */
  static async update(address) {
    if (!address || !address._id) {
      throw new AppError("brak adresu do aktualizacji", ARGUMENT_ERROR);
    }
    try {
      const doc = await Addresses.findOneAndUpdate(
        { _id: address._id },
        address,
        { new: true }
      );
      return {
        address: doc,
        message: "Updated",
      };
    } catch (err) {
      throw new AppError("blad mongodb", MONGO_ERROR, err);
    }
  }

  /**
   *
   * @param {String} id
   * @throes Error if lack of id or there is no address with provided id
   * @returns deleted address
   * @async
   * x
   */
  static async delete(id) {
    if (!id) {
      throw new AppError("brak id - arg err", ARGUMENT_ERROR);
    }
    try {
      return await Addresses.findOneAndDelete({
        _id: id,
      });
    } catch (err) {
      throw new AppError("id nie znalezione - mongo err", MONGO_ERROR, err);
    }
  }
}

module.exports = AddressesServices;
