const { UserInputError } = require("apollo-server");
const Hotel = require("../models/Hotel/Hotel");
const Room = require("../models/Hotel/Room");
const checkAuth = require("../util/check-auth");

module.exports = {
  Query: {
    async getRooms(_, args = null, context) {
      try {
        if (Object.keys(args).length === 0) {
          return await Room.find();
        }

        const hotel = await Hotel.findById(args.hotelId);
        const room = await Room.find({ hotel: hotel.nameHotel });
        if (room) {
          return room;
        } else {
          throw new UserInputError("Room not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getRoom(_, { id }, context) {
      try {
        if (id.trim() === "") {
          throw new UserInputError("Empty id", {
            errors: {
              id: "Id must not empty",
            },
          });
        }
        const room = await Room.findById(id);
        if (room) {
          return room;
        } else {
          throw new UserInputError("Room not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createBenefitRoom(_, { benefit, roomID }, context) {
      try {
        const room = await Room.findById(roomID);
        if (room) {
          room.benefits.unshift({
            benefit,
          });
          await room.save();
          return room;
        } else throw new UserInputError("Room not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createConditionRoom(_, { condition, roomID }, context) {
      try {
        const room = await Room.findById(roomID);
        if (room) {
          room.conditions.unshift({
            condition,
          });
          await room.save();
          return room;
        } else throw new UserInputError("Room not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async createRoom(_, { inputs }, context) {
      try {
        const room = await Room.findOne({ numberRoom: inputs.numberRoom });

        if (room) {
          throw new UserInputError("Mã phòng không được trùng", {
            errors: {
              numberRoom: "Mã phòng đã bị trùng",
            },
          });
        }
        // const hotel = await Hotel.findById({ id: inputs.hotelID });
        const newRoom = new Room({
          numberRoom: inputs.numberRoom,
          imgRoom: inputs.imgRoom,
          status: false,
          sizeRoom: inputs.sizeRoom,
          bed: inputs.bed,
          amountOfPeople: inputs.amountOfPeople,
          aboutRoom: inputs?.aboutRoom || "Đang cập nhật ...",
          price: inputs.price,
          quality: inputs.quality,
          hotel: inputs.hotel,
          createAt: new Date().toISOString(),
          updateAt: null,
        });
        await newRoom.save();
        return newRoom;
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateRoom(_, { inputs }, context) {
      try {
        const room = await Room.findOne({ numberRoom: inputs.numberRoom });

        if (room) {
          throw new UserInputError("Mã phòng đã tồn tại", {
            errors: {
              numberRoom: "Mã phòng đã tồn tại",
            },
          });
        }

        await Room.findByIdAndUpdate(
          { _id: inputs.id },
          {
            numberRoom: inputs.numberRoom,
            amountOfPeople: inputs.amountOfPeople,
            status: inputs.status,
            sizeRoom: inputs.sizeRoom,
            bed: inputs.bed,
            price: inputs.price,
            updateAt: new Date().toISOString(),
          }
        );
        const res = await Room.findById(inputs.id);
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteRoom(_, args, context) {
      try {
        await Room.findByIdAndDelete(args.roomID);
        // const res = await Room.find();
        return {
          message: "Xóa phòng thành công",
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

// numberRoom: ""
// imgRoom: ""
// sizeRoom: ""
// bed: ""
// amountOfPeople: ""
// aboutRoom: ""
// price: 2800000
// quality: ""
// hotel:""
