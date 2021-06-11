const Hotel = require("../models/Hotel/Hotel");
const BenefitHotel = require("../models/Hotel/BenefitHotel");
const CategoryHotel = require("../models/Hotel/CategoryHotel");
const AddressHotel = require("../models/Hotel/AddressHotel");
const Room = require("../models/Hotel/Room");
const Quanlity = require("../models/Hotel/Quanlity");
const Benefit = require("../models/Hotel/Benefit");
const Condition = require("../models/Hotel/Condition");
const PriceOfRoom = require("../models/Hotel/PriceOfRoom");
const Todo = require("../models/Todo");
const User = require("../models/User/User");
const hash = require("object-hash");
const OrderDetail = require("../models/Order/OrderDetail");
const Payment = require("../models/Order/Payment");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validator");
const checkAuth = require("../util/check-auth");

// const Story = require("../models/Story/Story");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
}

const mongoDataMethod = {
  getPayments: async (condition = null) => {
    if (Object.keys(condition).length === 0) {
      return await Payment.find();
    }

    return await Payment.find({
      token: condition.token, // hotelID : "98270902i34hjfg2089"
    }); //[{id,numberRoom,..,hotelID},...]
  },
  getPayment: async (token) => await Payment.findOne({ token: token }),
  checkout: async (args) => {
    const getOrderDetail = await OrderDetail.findOne({
      roomID: args.orderDetailID,
    });

    const getUser = await User.findOne({
      token: args.token,
    });

    const exchange = getUser.myWallet - getOrderDetail.total;
    const payInFull = getUser.myWallet - exchange;

    if (exchange >= 0) {
      const data = {
        token: args.token,
        paymentMethod: args.paymentMethod,
        orderDetail: getOrderDetail.token,
        checkout: payInFull,
      };

      await User.findByIdAndUpdate(
        getUser._id,
        { myWallet: exchange },
        { new: true }
      );

      await OrderDetail.findByIdAndUpdate(
        getOrderDetail._id,
        { isCheckout: true },
        { new: true }
      );

      const newCheckout = new Payment(data);
      return await newCheckout.save();

      console.log("Thanh toán thành công");
    } else {
      console.log("Thanh toán không thành công");
      // return{
      //   message:"Số tiền trong tài khoản không đủ !"
      // }
    }
  },

  getOrderDetails: async (condition = null) => {
    if (Object.keys(condition).length === 0) {
      return await OrderDetail.find();
    }

    return await OrderDetail.find({
      token: condition.token, // hotelID : "98270902i34hjfg2089"
    }); //[{id,numberRoom,..,hotelID},...]
  },
  getOrderDetail: async (token) => await OrderDetail.findOne({ token: token }),

  getOrderDetailbyID: async (roomID) =>
    await OrderDetail.findOne({ roomID: roomID }),

  addOrderDetail: async (args, ctx) => {
    // const getRoom = await Room.findById(args.roomID);
    // const getUser = await User.findOne({ token: args.token });
    // const dataOrderDetail = {
    //   roomID: args.roomID,
    //   numberRoom: getRoom.numberRoom,
    //   imgRoom: getRoom.imgRoom,
    //   status: true,
    //   sizeRoom: getRoom.sizeRoom,
    //   bed: getRoom.bed,
    //   amountOfPeople: getRoom.amountOfPeople,
    //   aboutRoom: getRoom.aboutRoom,
    //   price: getRoom.price,
    //   quanlityRoomID: getRoom.quanlityRoomID,
    //   hotelID: getRoom.hotelID,
    //   total: getRoom.price,
    //   token: args.token,
    //   isCheckout: false,
    // };
    // await Room.findByIdAndUpdate(args.roomID, { status: true }, { new: true });
    // const newOrderDetail = new OrderDetail(dataOrderDetail);
    // const res = await newOrderDetail.save();
    // return {
    //   data: res,
    //   user: getUser,
    //   message: "Đặt phòng thành công",
    //   statusCode: 200,
    // };
  },
  adminLogin: async (args) => {
    try {
      const findDatabyRequest = await User.findOne({ email: args.email });
      if (
        findDatabyRequest.role === true &&
        findDatabyRequest.email === args.email &&
        findDatabyRequest.password === args.password
      ) {
        return {
          token: findDatabyRequest.token,
          message: "Đăng nhập thành công",
        };
      } else {
        const error = { message: "sai tai khoan" };
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  login: async (email, password) => {
    // const dataLogin = {
    //   email: args.email,
    //   password: args.password,
    // };

    // const tokenLogin = hash(
    //   dataLogin.email,
    //   dataLogin.password,
    //   dataLogin.role
    // );
    // const dataUser = await User.findOne({ email: args.email });

    // if (tokenLogin == dataUser.token) {
    //   return {
    //     // data:dataUser,
    //     token: dataUser.token,
    //     nameUser: dataUser.name,
    //     message: "Thành công",
    //     statusCode: 200,
    //   };
    // }
    // console.log(email, password);
    const { errors, valid } = validateLoginInput(email, password);
    const user = await User.findOne({ email: email });
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }

    if (!user) {
      errors.general = "User not found";
      throw new UserInputError("Wrong credentials", { errors });
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      errors.general = "Wrong credentials";
      throw new UserInputError("Wrong credentials", { errors });
    }

    const token = generateToken(user);
    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },

  // register: async (args) => {
  //   const token = hash(args.email, args.password);
  //   const result = await User.find({ email: args.email });

  //   if (result.length == 0) {
  //     const data = {
  //       name: args?.name || null,
  //       imgUser: args?.imgUser || null,
  // phone: args?.phone || null,
  // CMND: args?.CMND || null,
  // email: args.email,
  // password: args.password,
  // role: args?.role || false,
  //       // token: args?.token || null
  //       token: token,
  //     };
  //     const newUser = new User(data);

  //     const res = await newUser.save();

  //     return {
  //       data: res,
  //       message: "Thành công",
  //       statusCode: 200,
  //     };
  //   } else {
  //     return {
  //       data: null,
  //       message: "Email đã tồn tại vui lòng chọn email khác",
  //       statusCode: 101,
  //     };
  //   }
  // },

  getUsers: async (condition = null) =>
    condition === null ? await User.find() : await User.find(condition),
  getUser: async (token) => await User.findOne({ token: token }),
  // createUser: async args => {
  //     const newUser = new User(args);
  //     return await newUser.save();
  // },

  getHotel: async (id) => await Hotel.findById(id),
  createHotel: async (args) => {
    const newHotel = new Hotel(args);
    return await newHotel.save();
  },

  getBenefitHotels: async (condition = null) =>
    condition === null
      ? await BenefitHotel.find()
      : await BenefitHotel.find(condition),
  getBenefitHotel: async (id) => await BenefitHotel.findById(id),
  createBenefitHotel: async (args) => {
    const newBenefitHotel = new BenefitHotel(args);
    return await newBenefitHotel.save();
  },

  getCategoryHotels: async (condition = null) =>
    condition === null
      ? await CategoryHotel.find()
      : await CategoryHotel.find(condition),
  getCategoryHotel: async (id) => await CategoryHotel.findById(id),
  createCategoryHotel: async (args) => {
    const newCategorytHotel = new CategoryHotel(args);
    return await newCategorytHotel.save();
  },

  getAddressHotels: async (condition = null) =>
    condition === null
      ? await AddressHotel.find()
      : await AddressHotel.find(condition),
  getAddressHotel: async (id) => await AddressHotel.findById(id),
  createAddressHotel: async (args) => {
    const newAddressHotel = new AddressHotel(args);
    return await newAddressHotel.save();
  },

  // ====================================  ROOM ========================================================

  createRoom: async (args) => {
    const newRoom = new Room(args);
    return await newRoom.save();
  },
  updateRoom: async (args) => {
    await Room.findByIdAndUpdate(
      { _id: args.id },
      {
        numberRoom: args.numberRoom,
        amountOfPeople: args.amountOfPeople,
        status: args.status,
        sizeRoom: args.sizeRoom,
        bed: args.bed,
        price: args.price,
      }
    );
    const res = await Room.findById(args.id);
    return {
      data: res,
      message: "Cập nhật phòng thành công",
    };
  },

  getQuanlities: async () => await Quanlity.find(),
  getQuanlity: async (id) => await Quanlity.findById(id),
  createQuanlity: async (args) => {
    const newQuanlity = new Quanlity(args);
    return await newQuanlity.save();
  },

  getBenefits: async (condition = null) =>
    condition === null ? await Benefit.find() : await Benefit.find(condition),
  getBenefit: async (id) => await Benefit.findById(id),
  createBenefit: async (args) => {
    const newBenefit = new Benefit(args);
    return await newBenefit.save();
  },

  getConditions: async (condition = null) =>
    condition === null
      ? await Condition.find()
      : await Condition.find(condition),
  getCondition: async (id) => await Condition.findById(id),
  createCondition: async (args) => {
    const newCondition = new Condition(args);
    return await newCondition.save();
  },

  // getPriceOfRooms: async (condition = null) =>
  //   condition === null
  //     ? await PriceOfRoom.find()
  //     : await PriceOfRoom.find(condition),
  // getPriceOfRoom: async (id) => await PriceOfRoom.findById(id),
  // createPriceOfRoom: async (args) => {
  //   const newPriceOfRoom = new PriceOfRoom(args);
  //   return await newPriceOfRoom.save();
  // },
  // =========================================================================================================

  getTodo: async (condition = null) =>
    condition === null ? await Todo.find() : await Todo.find(condition),
  addTodo: async (args, context) => {
    const user = checkAuth(context);

    const newTodo = new Todo(args);
    const res = await newTodo.save();
    return {
      data: res,
      message: "Thanh cong",
      statusCode: 200,
    };
  },

  getStory: async (condition = null) =>
    condition === null ? await Story.find() : await Story.find(condition),
};

module.exports = mongoDataMethod;
