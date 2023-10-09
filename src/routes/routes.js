import Cart from "~/pages/Cart/Cart";
import Home from "~/pages/Home/Home";
import Login from "~/pages/Auth/Login/Login";
import ProductDetail from "~/pages/Product/ProductDetail/ProductDetail";
import Product from "~/pages/Product/ProductsView/ProductsView";
import TrackingOrder from "~/pages/TrackingOrder/TrackingOrder";
import Dashboard from "~/pages/Admin/Dashboard/Dashboard";
import AdminBrand from "~/pages/Admin/AdminBrand/AdminBrand";
import AdminCategories from "~/pages/Admin/AdminCategories/AdminCategories";
import AdminOrders from "~/pages/Admin/AdminOrders/AdminOrders";
import AdminProducts from "~/pages/Admin/AdminProducts/AdminProducts";
import NotFound from "~/pages/Error/NotFound";
import PaymentReturnPage from "~/pages/Payment/PaymentReturnPage";
import AdminUpsertProduct from "~/pages/Admin/AdminProducts/AdminUpsertProduct";
import AdminUpsertBrand from "~/pages/Admin/AdminBrand/AdminUpsertBrand";
import AdminUpsertCategory from "~/pages/Admin/AdminCategories/AdminUpsertCategory";
import AdminUpsertOrder from "~/pages/Admin/AdminOrders/AdminUpsertOrder";

export const headerRoutes = [
  // { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/products" },
  { name: "Giỏ hàng", path: "/cart" },
  { name: "Kiểm tra đơn hàng", path: "/tracking-order" },
];

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Product },
  { path: "/products/:productRewriteUrl", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/payment-result", component: PaymentReturnPage },
  { path: "/tracking-order", component: TrackingOrder },
  { path: "/login", component: Login, layout: null },
  { path: "/*", component: NotFound, layout: null },
];

export const privateRoutes = [
  { path: "/admin", component: Dashboard },

  { path: "/admin/brands", component: AdminBrand },
  { path: "/admin/brands/add", component: AdminUpsertBrand },
  { path: "/admin/brands/edit/:brandId", component: AdminUpsertBrand },

  { path: "/admin/categories", component: AdminCategories },
  { path: "/admin/categories/add", component: AdminUpsertCategory },
  {
    path: "/admin/categories/edit/:categoryId",
    component: AdminUpsertCategory,
  },

  { path: "/admin/orders", component: AdminOrders },
  { path: "/admin/orders/edit/:orderId", component: AdminUpsertOrder },

  { path: "/admin/products", component: AdminProducts },
  { path: "/admin/products/add", component: AdminUpsertProduct },
  {
    path: "/admin/products/edit/:productId",
    component: AdminUpsertProduct,
  },
];
