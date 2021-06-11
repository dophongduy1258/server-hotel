const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    id: String!
    name: String
    imgAdmin: String
    role: String
    account: String
    password: String
    token: String
  }

  type User {
    id: String!
    name: String
    imgUser: String
    phone: String
    CMND: String
    email: String!
    password: String!
    role: Boolean
    myWallet: Int
    token: String
    createAt: String
  }

  # ******************  HOTEL  ******************
  type Hotel {
    id: String!
    nameHotel: String
    imgHotel: String
    rate: Int
    impress: String
    checkIn: String
    checkOut: String
    address: [AddressHotel]
    benefits: [BenefitHotel]
    conditions: [ConditionHotel]
    locations: [LocationHotel]
    createAt: String
    updateAt: String
  }

  type AddressHotel {
    id: String!
    address: String
  }

  type BenefitHotel {
    id: String!
    benefit: String
  }

  type ConditionHotel {
    id: String!
    condition: String
  }

  type LocationHotel {
    id: String!
    location: String
  }
  type UpdateHotelResponse {
    message: String
  }

  # ******************  END HOTEL  ******************

  # ******************  ROOM  ******************
  type Room {
    id: String!
    numberRoom: String
    imgRoom: String
    status: Boolean
    sizeRoom: String
    bed: String
    amountOfPeople: String
    aboutRoom: String
    price: Int
    quality: String
    benefits: [BenefitRoom]
    conditions: [ConditionRoom]
    hotel: String
    createAt: String
    updateAt: String
  }

  type BenefitRoom {
    id: String!
    benefit: String
  }

  type ConditionRoom {
    id: String!
    condition: String
  }

  type DeleteResponse {
    message: String
  }

  # ******************  END ROOM  ******************

  type Todo {
    id: String!
    type: Boolean
    slug: String
  }

  type AddToDoResponse {
    data: Todo
    message: String
    statusCode: Int
  }

  type RegisterResponse {
    data: User
    message: String
    statusCode: Int
  }

  type LoginResponse {
    message: String
  }

  # ******************  CART  ******************
  type Cart {
    items: [Room]
    total: Int
    user: String
  }

  type OrderDetail {
    id: String!
    numberRoom: String
    status: Boolean
    sizeRoom: String
    bed: String
    amountOfPeople: String
    price: Int
    quality: String
    hotel: String
    total: Int
    email: String
    isCheckout: Boolean
    createAt: String
  }

  type Payment {
    id: String!
    paymentMethod: String
    orderDetail: String
    checkout: Int
    email: String
    createAt: String
  }

  type OrderDetailResponse {
    message: String
  }

  # ******************  END CART  ******************

  type UpdateRoomResponse {
    data: Room
    message: String
  }

  type AdminLoginResponse {
    token: String
    message: String
  }

  # ==================================================================================

  input CreateRoom {
    numberRoom: String
    imgRoom: String
    sizeRoom: String
    bed: String
    amountOfPeople: String
    aboutRoom: String
    price: Int
    quality: String
    hotel: String
    createAt: String
  }

  input UpdateRoom {
    id: String
    numberRoom: String
    amountOfPeople: String
    status: Boolean
    sizeRoom: String
    bed: String
    price: Int
    updateAt: String
  }

  input UpdateHotel {
    nameHotel: String
    imgHotel: String
    rate: Int
    impress: String
    checkIn: String
    checkOut: String
  }

  input Checkout {
    paymentMethod: String
    orderDetailID: String
  }

  input AdminLogin {
    email: String
    password: String
  }

  input Login {
    email: String
    password: String
  }

  input Register {
    name: String
    phone: String
    CMND: String
    email: String!
    password: String!
  }

  input CreateHotel {
    nameHotel: String
    imgHotel: String
    rate: Int
    impress: String
    checkIn: String
    checkOut: String
  }

  input CreateBenefitHotel {
    benefit: String
    hotelID: String
  }

  input AddTodo {
    type: Boolean
    slug: String
  }

  input AddOrderDetail {
    roomID: String
    token: String
  }

  # ==================================================================================

  type Query {
    # ******************  PAYMENT  ******************
    getPayments(token: String): [Payment]
    getPayment(token: String): Payment

    getOrderDetails(token: String): [OrderDetail]
    getOrderDetail(token: String): OrderDetail
    getOrderDetailbyID(orderDetailID: String): OrderDetail

    getUsers: [User]
    getUser(token: String): User

    # ****************** END PAYMENT  ******************

    # ******************  HOTEL  ******************
    getHotels(location: String): [Hotel]
    getHotel(id: String!): Hotel

    getBenefitHotels: [BenefitHotel]
    getBenefitHotel(id: String!): BenefitHotel

    getAddressHotels: [AddressHotel]
    getAddressHotel(id: String!): AddressHotel

    # ******************  END HOTEL  ******************

    getRooms(hotelId: String): [Room]
    getRoom(id: String!): Room

    getTodos: [Todo]
  }

  type Mutation {
    # ******************  USER  ******************

    adminLogin(email: String, password: String): User

    login(email: String, password: String): User

    register(inputs: Register): User

    # ******************  END USER  ******************

    # filterHotelByCondition(type: String, value: String): [Hotel]

    # ******************  HOTEL  ******************
    createHotel(inputs: CreateHotel): Hotel
    createAddressHotel(address: String, hotelID: String): Hotel
    createBenefitHotel(benefit: String, hotelID: String): Hotel
    createConditionHotel(condition: String, hotelID: String): Hotel
    createLocationHotel(location: String, hotelID: String): Hotel
    updateHotel(inputs: UpdateHotel): UpdateHotelResponse
    deleteHotel(hotelID: String): DeleteResponse

    # ******************  END HOTEL  ******************

    # ******************  ROOM  ******************
    createRoom(inputs: CreateRoom): Room
    createBenefitRoom(benefit: String, roomID: String): Room
    createConditionRoom(condition: String, roomID: String): Room
    updateRoom(inputs: UpdateRoom): UpdateRoomResponse
    deleteRoom(roomID: String): DeleteResponse
    # ******************  END ROOM  ******************

    # ******************  CART  ******************
    addOrderDetail(roomID: String, token: String): OrderDetailResponse
    deleteOrderDetail(orderDetailID: String): DeleteResponse
    checkout(inputs: Checkout): Payment
    cancelOrderDetail(orderDetailID: String): OrderDetailResponse
    # addOrderDetail(inputs: AddOrderDetail): OrderDetailResponse

    # ******************  END  CART  ******************
    addTodo(inputs: AddTodo): AddToDoResponse
  }
`;
module.exports = typeDefs;
