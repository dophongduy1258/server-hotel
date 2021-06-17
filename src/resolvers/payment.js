const { checkout, getPayments } = require("../db/data");
const OrderDetail = require("../models/Order/OrderDetail");
const Payment = require("../models/Order/Payment");
const User = require("../models/User/User");
const { UserInputError } = require("apollo-server");

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
        const data = {
          paymentMethod: args.inputs.paymentMethod,
          orderDetail: orderDetail.id,
          checkout: orderDetail.total,
          codeVoucher:orderDetail.codeVoucher,
          email: user.email,
          createAt: new Date().toISOString(),
        };

        const newPayment = new Payment(data);

        if ( orderDetail.total < 2500000) {
          const couponReward = 3; 

            await User.updateOne({
              email:orderDetail.email  
            },{coupon:user.coupon + couponReward}
            )
            
            await OrderDetail.findByIdAndUpdate(
              orderDetail._id,
              { isCheckout: true,
                statusOrder:true, },
              { new: true }
            );

            return await newPayment.save();
            
          }
          
          else if(orderDetail.total < 4500000){
            const couponReward = 6; 

            await User.updateOne({
              email:orderDetail.email  
            },{coupon:user.coupon + couponReward}
            )
            
            await OrderDetail.findByIdAndUpdate(
              orderDetail._id,
              { isCheckout: true,
                statusOrder:true, },
              { new: true }
            );

            return await newPayment.save();

          }
          
          else if(orderDetail.total < 7500000){
            const couponReward = 10; 

            await User.updateOne({
              email:orderDetail.email  
            },{coupon:user.coupon + couponReward}
            )
            
            await User.updateOne({
              'vouchers.code':orderDetail.codeVoucher
            },{$set:{"vouchers.$.status":true}})

            await OrderDetail.findByIdAndUpdate(
              orderDetail._id,
              { isCheckout: true,
                statusOrder:true, },
              { new: true }
            );

            return await newPayment.save();
          }
          
          else if(orderDetail.total < 1000000){
            const couponReward = 14; 

            await User.updateOne({
              email:orderDetail.email  
            },{coupon:user.coupon + couponReward}
            )
            
            await OrderDetail.findByIdAndUpdate(
              orderDetail._id,
              { isCheckout: true,
                statusOrder:true, },
              { new: true }
            );

            return await newPayment.save();
          }

          else if(orderDetail.total < 1500000){
            const couponReward = 18; 

            await User.updateOne({
              email:orderDetail.email  
            },{coupon:user.coupon + couponReward}
            )
            
            await OrderDetail.findByIdAndUpdate(
              orderDetail._id,
              { isCheckout: true,
                statusOrder:true, },
              { new: true }
            );

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
