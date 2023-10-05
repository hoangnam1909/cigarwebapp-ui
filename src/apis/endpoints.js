export let publicEndpoints = {
  brands: "/brands",
  carts: "/carts",
  categories: "/categories",
  products: "/products",
  productsSuggestion: "/products/suggests",
  countProductsOnSale: "/products/count-product-on-sale",
  register: "/auth/register",
  authenticate: "/auth/authenticate",
  verify: "/auth/verify",
  currentUser: "/auth/current-user",
  refreshToken: "/auth/refresh",
  customer: "/customers",
  orders: "/orders",
  trackingOrder: "/orders/tracking",
};

export let privateEndpoints = {
  brands: "/admin/brands",
  categories: "/admin/categories",
  products: "/admin/products",
  orders: "/admin/orders",
  orderStatuses: "/admin/order-statuses",
  orderStatus: "/admin/order-statuses",
  deliveryCompanies: "/admin/delivery-companies",
};
