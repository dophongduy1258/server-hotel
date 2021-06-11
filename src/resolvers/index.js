const usersResolvers = require("./user");
const roomsResolvers = require("./room");
const hotelsResolvers = require("./hotel");
const ordersDetailResolvers = require("./orderDetail");
const paymentsResolvers = require("./payment");
const vouchersResolvers = require("./voucher");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...roomsResolvers.Query,
    ...hotelsResolvers.Query,
    ...ordersDetailResolvers.Query,
    ...paymentsResolvers.Query,
    ...vouchersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...roomsResolvers.Mutation,
    ...hotelsResolvers.Mutation,
    ...ordersDetailResolvers.Mutation,
    ...paymentsResolvers.Mutation,
    ...vouchersResolvers.Mutation,
  },
};
