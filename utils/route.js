var baseUrl = "http://fatezero.e2.luyouxia.net:31952/";
// var baseUrl = "https://project.wuyunjiang.cn/";

module.exports = {
  // login
  login: baseUrl+"login",
  // home
  addOrder: baseUrl + "addToShopCar",
  queryPerfectPro: baseUrl + "queryPerfectPro",
  // address
  updateDefaultAddress: baseUrl + "updateDefaultAddress",
  deleteAddress: baseUrl + "deleteAddress",
  getAllAddressByUserId: baseUrl + "getAllAddressByUserId",
  updateAddress: baseUrl + "updateAddress",
  addAddress: baseUrl + "addAddress",
  // category 
  productKinds: baseUrl + "productKinds",
  // goodDetails
  productLinkInfo: baseUrl + "productLinkInfo",
  // goodList
  getProductsByPriceASC: baseUrl + "getProductsByPriceASC",
  getProductsBySalesDesc: baseUrl + "getProductsBySalesDesc",
  likeQueryProductByName: baseUrl + "likeQueryProductByName",
  getAllProduct: baseUrl + "getAllProduct",
  getProductsByOnlineTime: baseUrl + "getProductsByOnlineTime",
  getProductsByKind: baseUrl + "getProductsByKind",
  // myCupones
  fetchCoupon: baseUrl + "fetchCoupon",
  queryAllCanUserCoupon: baseUrl + "queryAllCanUserCoupon",
  // myOrder
  querycommitOrder: baseUrl + "querycommitOrder",
  allOrders: baseUrl + "allOrders",
  // order
  allOrders: baseUrl + "allOrders",
  buyProduct: baseUrl + "buyProduct",
  // shoppingCart
  updateOrderSelect: baseUrl + "updateShopCarSelect",
  updateOrderAllSelect: baseUrl + "updateOrderAllSelect",
  // getOrdersByUserId: baseUrl + "getOrdersByUserId",
  getOrdersByUserId: baseUrl + "queryShopCar",
  updateProductNum: baseUrl + "updateShopCarProductNum",
  deleteOrders: baseUrl + "deleteShopCar",
  querySelectedOrder: baseUrl + "querySelectedOrder"
};