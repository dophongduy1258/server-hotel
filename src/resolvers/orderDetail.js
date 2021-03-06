const Room = require("../models/Hotel/Room");
const OrderDetail = require("../models/Order/OrderDetail");
const checkAuth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");
const User = require("../models/User/User");
const Voucher = require("../models/Voucher/Voucher");
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
            moneyDecreased:0,
            total: room.price,
            email: user.email,
            isCheckout: false,
            codeVoucher:null,
            statusOrder:null,
            createAt: new Date().toISOString(),
          };
          const res = new OrderDetail(orderDetail);
          await res.save();
          return {
            message: "?????t ph??ng th??nh c??ng",
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
          message: "H???y ?????t ph??ng th??nh c??ng",
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
          message: "X??a phi???u ?????t ph??ng th??nh c??ng",
        };
      } catch (error) {
        throw new Error(error);
      }
    },

    async checkoutRoom(_,args,context){
      try {
        if(args.confirm == false){
          console.log('Tr??? ph??ng th???t b???i')
        }
        const orderDetail = await OrderDetail.findById(args.orderDetailID)

        await Room.findOneAndUpdate({numberRoom:orderDetail.numberRoom,hotel:orderDetail.hotel},{status:false})
        await OrderDetail.findByIdAndUpdate({_id:args.orderDetailID},{statusOrder:false})
        
        // const res = await OrderDetail.findById(args.orderDetailID);
        return {
          message:'Tr??? ph??ng th??nh c??ng'
        }
        
      } catch (error) {
        throw new Error(error)
      }
    },

    async addVoucher(_,args,context){
      try {

        // case 1 : codeVoucher l?? chu???i kh??ng
        // case 2 : codeVoucher ???????c nh???p
        const voucher = await Voucher.findOne({code:args.codeVoucher})
        
        if(args.codeVoucher.trim() === ''){
          const emptyCodeVoucher = args.codeVoucher.trim();
          await OrderDetail.findByIdAndUpdate({"_id":args.orderDetailID},{codeVoucher:emptyCodeVoucher}); 
          return{
            message:"Code voucher r???ng"
          }
        }else{
          // ki???m tra xem trong account c???a user c?? m?? code n??y t???n t???i hay ch??a
          const checkVoucherExist = await User.findOne({
            'vouchers.code':args.codeVoucher,
          })
          if(checkVoucherExist){
            const checkVoucherIsUse = await User.findOne({
              'vouchers.code':args.codeVoucher,
                'vouchers.status':true
            })
            if(checkVoucherIsUse){
              throw new UserInputError('Code ???? ???????c s??? d???ng')  
            }else{
              const orderDetail = await OrderDetail.findById(args.orderDetailID)
              const user = await User.findOne({email:orderDetail.email})

              // update moneyDecreased , codeVoucher, total , amountVoucher 
              const newMoneyDecreased =  voucher.price;

              const newTotal = orderDetail.price - newMoneyDecreased;
              
              
              // ti???n th???a
              const exchange = user.myWallet - newTotal;
              
              // ti???n s??? ti???n ph???i tr??? cho h??a ????n ?????t ph??ng 
              const payInFull = user.myWallet - exchange;
              
              // n???u ti???n th???a l???n h??n 0 ngh??a l?? ti???n trong accout ????? tr???
              if(exchange >= 0){
                await OrderDetail.findByIdAndUpdate({"_id":args.orderDetailID},{
                  codeVoucher:args.codeVoucher,
                  moneyDecreased:newMoneyDecreased,
                  total:payInFull
                });
                
                await User.findByIdAndUpdate(
                  user._id,
                  { myWallet: exchange},
                  { new: true }
                );
                return {
                  message:"Nh???p code voucher th??nh c??ng"
                }
              }else{
                throw new UserInputError('S??? ti???n trong t??i kho???n kh??ng ????? ????? chi tr???');
              }
            }
          }else{
            throw new UserInputError('Code ko t???n t???i trong accout');
          }
        }

      } catch (error) {
        throw new Error(error)
      }
    }

  },
};
