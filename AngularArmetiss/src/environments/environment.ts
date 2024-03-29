 const apiEndpoint = 'http://localhost/test/server/gestion-user';
 const apiAddStock = 'http://localhost/test/server';
 const apiGetStockProduct = 'http://localhost/test/server';

export const environment = {
  apiLoginUrl: `${apiEndpoint}/user.php`,
  apiGetUser: `${apiEndpoint}/user.php`,
  apiGetId: `${apiEndpoint}/getId.php`,
  apiAddStock: `${apiAddStock}/gestion-stock/addStock.php`,
  apiGetStockProduct: `${apiGetStockProduct}/gestion-stock/updateProductQuantity.php`,
  apiGetAllStockProduct: `${apiGetStockProduct}/gestion-stock/updateAllProductQuantity.php`,
  apiGetImg: `${apiGetStockProduct}/gestion-stock/getImg.php`,
};
