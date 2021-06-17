const { UserInputError } = require("apollo-server-errors");
const { findOne } = require("../models/Voucher/Voucher");
const Voucher = require("../models/Voucher/Voucher");

module.exports = {
  Query: {
    async getVouchers(_, args, context) {
      try {
        const res = await Voucher.find();
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createVoucher(_, args, context) {
      try {
        const voucher = await Voucher.findOne({ code: args.inputs.code });
        if (voucher) {
          throw new UserInputError("Mã voucher đã tồn tại", {
            errors: {
              code: "Mã voucher không được trùng",
            },
          });
        }
        if (args.inputs.code.length > 10) {
          throw new UserInputError("Mã voucher không được dài hơn 10 ký tự", {
            errors: {
              code: "Mã voucher vượt quá 10 ký tự",
            },
          });
        }
        const newVoucher = new Voucher({
          code: args.inputs.code,
          voucher: args.inputs.voucher,
          displayName: args.inputs.displayName,
          signature: args.inputs.signature,
          couponCondition: args.inputs.couponCondition,
          isDisplay: args.inputs.isDisplay,
          price:args.inputs.price,
          amount: args.inputs.amount,
          createAt: new Date().toISOString(),
          updateAt: null,
        });
        return await newVoucher.save();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
