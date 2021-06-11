const { checkout, getPayments } = require("../db/data");
const OrderDetail = require("../models/Order/OrderDetail");
const Payment = require("../models/Order/Payment");
const User = require("../models/User/User");

module.exports = {
  Query: {
    async getPayments(_, args = null, context) {
      try {
        if (Object.keys(args).length === 0) {
          return await Payment.find();
        }
        const user = await User.findOne({ token: args.token });
        if (user.role === true) {
          return await Payment.find();
        }

        const res = await Payment.find({ token: args.token });
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async checkout(_, args, context) {
      try {
        // {paymentMethod,orderDetailID}
        const orderDetail = await OrderDetail.findById(
          args.inputs.orderDetailID
        );
        const user = await User.findOne({ email: orderDetail.email });
        const exchange = user.myWallet - orderDetail.total;
        const payInFull = user.myWallet - exchange;
        if (exchange >= 0) {
          const data = {
            paymentMethod: args.inputs.paymentMethod,
            orderDetail: orderDetail.id,
            checkout: payInFull,
            email: user.email,
            createAt: new Date().toISOString(),
          };

          await User.findByIdAndUpdate(
            user._id,
            { myWallet: exchange },
            { new: true }
          );

          await OrderDetail.findByIdAndUpdate(
            orderDetail._id,
            { isCheckout: true },
            { new: true }
          );

          const newPayment = new Payment(data);
          return await newPayment.save();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Payment: {
    async orderDetail(_, args, context) {
      console.log(_);
    },
  },
};
