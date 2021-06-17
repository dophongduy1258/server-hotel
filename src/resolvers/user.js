const User = require("../models/User/User");

const hash = require("object-hash");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../config/config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validator");
const checkAuth = require("../util/check-auth");
const Voucher = require("../models/Voucher/Voucher");

// const Story = require("../models/Story/Story");

// function generateToken(user) {
//   return jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//     },
//     SECRET_KEY,
//     { expiresIn: "5h" }
//   );
// }

module.exports = {
  Query: {
    async getUsers(_, args, context) {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getUser(_, args, context) {
      try {
        const user = await User.findOne({ token: args.token });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async adminLogin(_, { email, password }, context) {
      // const { errors, valid } = validateLoginInput(email, password);
      // const user = await User.findOne({ email: email });
      // if (!valid) {
      //   throw new UserInputError("Errors", { errors });
      // }
      const res = await User.findOne({ email: email });

      if (res.role !== true) {
        return {
          message: "Bạn không đủ quyền để truy cập",
        };
      }
      return res;
      // if (!user) {
      //   errors.general = "User not found";
      //   throw new UserInputError("Wrong credentials", { errors });
      // }
      // const match = await bcryptjs.compare(password, user.password);
      // if (!match) {
      //   errors.general = "Wrong credentials";
      //   throw new UserInputError("Wrong credentials", { errors });
      // }

      // const token = generateToken(user);
      // return {
      //   ...user._doc,
      //   id: user._id,
      //   token,
      // };
    },

    async login(_, { email, password }, context) {
      const { errors, valid } = validateLoginInput(email, password);
      const user = await User.findOne({ email: email });
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Wrong credentials", { errors });
      }
      // const match = await bcryptjs.compare(password, user.password);
      // if (!match) {
      //   errors.general = "Wrong credentials";
      //   throw new UserInputError("Wrong credentials", { errors });
      // }
      if (email !== user.email) {
        return {
          message: "Lỗi đăng nhập",
        };
      }

      // const token = generateToken(user);
      return user;
    },

    async register(_, { inputs }, context) {
      const token = hash(inputs.email, inputs.password);
      const { valid, errors } = validateRegisterInput(
        inputs.name,
        inputs.email,
        inputs.password
      );
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ email: inputs.email });

      if (user) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      // password = await bcryptjs.hash(inputs.password, 12);

      const newUser = new User({
        name: inputs.name,
        imgUser: null,
        phone: inputs?.phone || null,
        CMND: inputs?.CMND || null,
        email: inputs.email,
        password: inputs.password,
        role: false,
        myWallet: 0,
        token: token,
        coupon:0,
        createAt: new Date().toISOString(),
      });
      // const token = generateToken(res);
      return await newUser.save();
    },

    async exchangeVoucher(_,args,context){
      try {
          const voucher = await Voucher.findById(args.voucherID);
          
          const user = await User.findOne({token:args.token})
          if(user){
            if(user.coupon < voucher.couponCondition){
              throw new UserInputError('Coupon không đủ điều kiện để đổi voucher này')
            }else{
              const checkVoucher = await User.findOne({
                'vouchers.code':voucher.code
              })
              if(!checkVoucher){
                await Voucher.findOneAndUpdate({code:voucher.code},{amount:voucher.amount-1})
                user.vouchers.unshift({
                  code:voucher.code,
                  voucher:voucher.voucher,
                  displayName:voucher.displayName,
                  status:false,
                  createAt:new Date().toDateString()
                })
                await user.save();
                return {
                  message:"Đổi code thành công"
                }
              }else throw new UserInputError('Code chỉ được đổi 1 lần')
            }
          }else throw new UserInputError('Tài khoản không tồn tại')

      } catch (error) {
        throw new Error(error)
      }
    }


  },
};
