const { UserInputError } = require("apollo-server-errors");
const Hotel = require("../models/Hotel/Hotel");
const checkAuth = require("../util/check-auth");

module.exports = {
  Query: {
    async getHotels(_, args = null, context) {
      if (Object.keys(args).length === 0) {
        return await Hotel.find();
      }
      const locations = await Hotel.find({
        "locations.location": args.location,
      }); // [{id,address,hotelID},..]

      return locations;
    },

    async getHotel(_, args, context) {
      try {
        const hotel = await Hotel.findById(args.id);
        return hotel;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createAddressHotel(_, { address, hotelID }, context) {
      try {
        const hotel = await Hotel.findById(hotelID);
        if (hotel) {
          hotel.address.unshift({
            address,
          });
          await hotel.save();
          return hotel;
        } else throw new UserInputError("Hotel not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createBenefitHotel(_, { benefit, hotelID }, context) {
      try {
        const hotel = await Hotel.findById(hotelID);
        if (hotel) {
          hotel.benefits.unshift({
            benefit,
          });
          await hotel.save();
          return hotel;
        } else throw new UserInputError("Hotel not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createConditionHotel(_, { condition, hotelID }, context) {
      try {
        const hotel = await Hotel.findById(hotelID);
        if (hotel) {
          hotel.conditions.unshift({
            condition,
          });
          await hotel.save();
          return hotel;
        } else throw new UserInputError("Hotel not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createLocationHotel(_, { location, hotelID }, context) {
      try {
        const hotel = await Hotel.findById(hotelID);
        if (hotel) {
          hotel.locations.unshift({
            location,
          });
          await hotel.save();
          return hotel;
        } else throw new UserInputError("Hotel not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createHotel(_, { inputs }, context) {
      try {
        // const user = checkAuth(context); // {id:"",email:"",name:""}
        const hotel = await Hotel.findOne({ nameHotel: inputs.nameHotel });
        if (hotel) {
          throw new UserInputError("Tên khách không được trùng", {
            errors: {
              numberRoom: "Tên khách sạn đã đã tồn tại",
            },
          });
        }
        const newHotel = new Hotel({
          nameHotel: inputs.nameHotel,
          imgHotel: inputs.imgHotel,
          rate: inputs.rate,
          impress: inputs.impress,
          checkIn: inputs.checkIn,
          checkOut: inputs.checkOut,
          createAt: new Date().toISOString(),
        });
        await newHotel.save();
        return newHotel;
      } catch (error) {
        throw new Error(error);
      }
    },

    // async filterHotelByCondition(_,{type,value},context){
    //   try {
    //     switch (type) {
    //       case "address":
    //         const hotel = await Hotel.find({"address.address":value})
    //         break;
    //       default:
    //         break;
    //     }
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // },
  },
};
