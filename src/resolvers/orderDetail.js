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

    async checkoutRoom(_,args,context){
      try {
        if(args.confirm == false){
          console.log('Trả phòng thất bại')
        }
        const orderDetail = await OrderDetail.findById(args.orderDetailID)

        await Room.findOneAndUpdate({numberRoom:orderDetail.numberRoom,hotel:orderDetail.hotel},{status:false})
        await OrderDetail.findByIdAndUpdate({_id:args.orderDetailID},{statusOrder:false})
        
        // const res = await OrderDetail.findById(args.orderDetailID);
        return {
          message:'Trả phòng thành công'
        }
        
      } catch (error) {
        throw new Error(error)
      }
    },

    async addVoucher(_,args,context){
      try {

        // case 1 : codeVoucher là chuỗi không
        // case 2 : codeVoucher được nhập
        const voucher = await Voucher.findOne({code:args.codeVoucher})
        
        if(args.codeVoucher.trim() === ''){
          const emptyCodeVoucher = args.codeVoucher.trim();
          await OrderDetail.findByIdAndUpdate({"_id":args.orderDetailID},{codeVoucher:emptyCodeVoucher}); 
          return{
            message:"Code voucher rỗng"
          }
        }else{
          // kiểm tra xem trong account của user có mã code này tồn tại hay chưa
          const checkVoucherExist = await User.findOne({
            'vouchers.code':args.codeVoucher,
          })
          if(checkVoucherExist){
            const checkVoucherIsUse = await User.findOne({
              'vouchers.code':args.codeVoucher,
                'vouchers.status':true
            })
            if(checkVoucherIsUse){
              throw new UserInputError('Code đã được sử dụng')  
            }else{
              const orderDetail = await OrderDetail.findById(args.orderDetailID)
              const user = await User.findOne({email:orderDetail.email})

              // update moneyDecreased , codeVoucher, total , amountVoucher 
              const newMoneyDecreased =  voucher.price;

              const newTotal = orderDetail.price - newMoneyDecreased;
              
              
              // tiền thừa
              const exchange = user.myWallet - newTotal;
              
              // tiền số tiền phải trả cho hóa đơn đặt phòng 
              const payInFull = user.myWallet - exchange;
              
              // nếu tiền thừa lớn hơn 0 nghĩa là tiền trong accout đủ trả
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
                  message:"Nhập code voucher thành công"
                }
              }else{
                throw new UserInputError('Số tiền trong tài khoản không đủ để chi trả');
              }
            }
          }else{
            throw new UserInputError('Code ko tồn tại trong accout');
          }
        }

      } catch (error) {
        throw new Error(error)
      }
    }

  },
};
