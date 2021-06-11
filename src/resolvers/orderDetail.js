const Room = require("../models/Hotel/Room");
const OrderDetail = require("../models/Order/OrderDetail");
const checkAuth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");
const User = require("../models/User/User");
module.exports = {
  Query: {
    async getOrderDetailbyID(_, args, context) {
      try {
        const orderDetail = await OrderDetail.findById(args.orderDetailID);
        return orderDetail;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getOrderDetails(_, args = null, context) {
      try {
        // const { email } = checkAuth(context); // {id:"",email:"",name:""}

        if (Object.keys(args).length === 0) {
          return await OrderDetail.find();
        }

        const user = await User.findOne({ token: args.token });
        if (user.role === true) {
          return await OrderDetail.find();
        }

        const res = await OrderDetail.find({ email: email });
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addOrderDetail(_, args, context) {
      try {
        const user = await User.findOne({ token: args.token });
        // const { email } = checkAuth(context);
        const room = await Room.findOne({ _id: args.roomID });
        if (room) {
          await Room.findByIdAndUpdate(
            args.roomID,
            { status: true },
            { new: true }
          );
          const orderDetail = {
            numberRoom: room.numberRoom,
            status: true,
            sizeRoom: room.sizeRoom,
            bed: room.bed,
            amountOfPeople: room.amountOfPeople,
            price: room.price,
            quality: room.quality,
            hotel: room.hotel,
            total: room.price,
            email: user.email,
            isCheckout: false,
            createAt: new Date().toISOString(),
          };
          const res = new OrderDetail(orderDetail);
          await res.save();
          return {
            message: "Đặt phòng thành công",
          };
        } else throw new UserInputError("Room not found");
      } catch (error) {
        throw new Error(error);
      }
    },

    async cancelOrderDetail(_, args, context) {
      try {
        const res = await OrderDetail.findById(args.orderDetailID);
        await Room.findOneAndUpdate(
          { numberRoom: res.numberRoom, hotel: res.hotel },
          {
            status: false,
          }
        );
        await OrderDetail.findByIdAndRemove(args.orderDetailID);
        return {
          message: "Hủy đặt phòng thành công",
        };
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteOrderDetail(_, args, context) {
      try {
        await OrderDetail.findByIdAndDelete(args.orderDetailID);
        // const res = await Room.find();
        return {
          message: "Xóa phiếu đặt phòng thành công",
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
