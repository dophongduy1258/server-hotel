const resolvers = {
  Query: {
    getPayments: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getPayments(args),
    getPayment: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getPayment(args.token),

    getOrderDetails: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getOrderDetails(args),
    getOrderDetail: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getOrderDetail(args.token),
    getOrderDetailbyID: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getOrderDetailbyID(args.roomID),

    getHotels: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotels(args),
    getHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotel(args.id),

    getBenefitHotels: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefitHotels(),
    getBenefitHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefitHotel(args.id),

    getCategoryHotels: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getCategoryHotels(),
    getCategoryHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getCategoryHotel(args.id),

    getAddressHotels: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAddressHotels(),
    getAddressHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAddressHotel(args.id),

    getRooms: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getRooms(args),
    getRoom: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getRoom(args.id),

    getQuanlities: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlities(),
    getQuanlity: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlity(args.id),

    getBenefits: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefits(),
    getBenefit: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefit(args.id),

    getConditions: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getConditions(),
    getCondition: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getCondition(args.id),

    // getPriceOfRooms: async (parent, args, { mongoDataMethod }) =>
    //   await mongoDataMethod.getPriceOfRooms(),
    // getPriceOfRoom: async (parent, args, { mongoDataMethod }) =>
    //   await mongoDataMethod.getPriceOfRoom(args.id),

    getTodos: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getTodos(),
  },

  Mutation: {
    checkout: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.checkout(args.inputs),

    addOrderDetail: async (parent, args, { mongoDataMethod }, ctx) =>
      await mongoDataMethod.addOrderDetail(args.inputs),

    adminLogin: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.adminLogin(args.inputs),

    login: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.login(args.email, args.password),

    register: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.register(args.inputs),

    createHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createHotel(args.inputs),

    createBenefitHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createBenefitHotel(args.inputs),

    createCategoryHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createCategoryHotel(args.inputs),

    createAddressHotel: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createAddressHotel(args.inputs),

    createRoom: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createRoom(args.inputs),

    createQuanlity: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createQuanlity(args.inputs),

    createBenefit: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createBenefit(args.inputs),

    createCondition: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createCondition(args.inputs),

    addTodo: async (parent, args, context) =>
      await context.mongoDataMethod.addTodo(args.inputs, context),

    updateRoom: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.updateRoom(args.inputs),
  },
  // User:{
  //     role: async ({id},args,{mongoDataMethod})=> await mongoDataMethod.getCategoryHotel({userID:id})
  // },
  Payment: {
    token: async ({ token }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getUser(token),
    orderDetail: async ({ orderDetail }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getOrderDetail(orderDetail),
  },

  OrderDetail: {
    quanlityRoomID: async ({ quanlityRoomID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlity(quanlityRoomID),

    hotelID: async ({ hotelID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotel(hotelID),

    // token: async ({ token }, args, { mongoDataMethod }) =>
    //   await mongoDataMethod.getUser(token),
  },

  Hotel: {
    // addressID: async ({addressID},args,{mongoDataMethod})=> await mongoDataMethod.getAddressHotel(addressID),
    address: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAddressHotels({ hotelID: id }),

    rooms: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getRooms({ hotelID: id }),

    benefitHotels: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefitHotels({ hotelID: id }),

    categoryID: async ({ categoryID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getCategoryHotel(categoryID),
  },

  BenefitHotel: {
    hotelID: async ({ hotelID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotel(hotelID),
  },

  AddressHotel: {
    hotelID: async ({ hotelID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotel(hotelID),
    // hotels : async({id},args,{mongoDataMethod}) => await mongoDataMethod.getHotels({addressID:id}),
  },

  CategoryHotel: {
    hotels: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotels({ categoryID: id }),
  },
  Room: {
    // parent là object getRoom tìm được {numberRoom,....}
    quanlityRoomID: async ({ quanlityRoomID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlity(quanlityRoomID),

    hotelID: async ({ hotelID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getHotel(hotelID),
  },
  QuanlityRoom: {
    rooms: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getRooms({ quanlityRoomID: id }),

    // priceRooms: async ({ id }, args, { mongoDataMethod }) =>
    //   await mongoDataMethod.getPriceOfRooms({ quanlityRoomID: id }),

    benefits: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBenefits({ quanlityRoomID: id }),

    conditions: async ({ id }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getConditions({ quanlityRoomID: id }),
  },
  Benefit: {
    quanlityRoomID: async ({ quanlityRoomID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlity(quanlityRoomID),
  },
  Condition: {
    quanlityRoomID: async ({ quanlityRoomID }, args, { mongoDataMethod }) =>
      await mongoDataMethod.getQuanlity(quanlityRoomID),
  },
  // PriceOfRoom: {
  //   quanlityRoomID: async ({ quanlityRoomID }, args, { mongoDataMethod }) =>
  //     await mongoDataMethod.getQuanlity(quanlityRoomID),
  // },
};

module.exports = resolvers;
