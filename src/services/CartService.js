export const addProductToCart = (product) => {
  let cart = [];
  let existedIndex = -1;

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    existedIndex = cart.findIndex((p) => p.id === product.id);

    if (existedIndex >= 0) {
      cart[existedIndex].quantity = cart[existedIndex].quantity + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }
  }

  cart.push({
    id: product.id,
    // name: product.name,
    // image: product.productImages[0].linkToImage,
    // salePrice: product.salePrice,
    quantity: 1,
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const getProductIdsCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    let productIds = cart?.map((c) => c.id);
    productIds = productIds.join(",");

    return productIds;
  }

  return "";
};

export const updateCart = (productsInDB) => {
  let newCart = [];
  let cartItem;
  let localCart = JSON.parse(localStorage.getItem("cart"));

  productsInDB.forEach((p) => {
    cartItem = localCart.find((c) => c.id == p.id);
    if (cartItem != null) {
      newCart.push({
        id: p.id,
        quantity:
          cartItem.quantity > p.unitsInStock
            ? p.unitsInStock
            : cartItem.quantity,
      });
    }
  });

  localStorage.setItem("cart", JSON.stringify(newCart));
};

export const updateQuantity = (productId, newQuantity) => {
  let cart = [];
  let existedIndex = -1;

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

    existedIndex = cart.findIndex((p) => p.id === productId);

    if (existedIndex >= 0) {
      cart[existedIndex].quantity = parseInt(newQuantity);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const getOrderItems = () => {
  let cart = [];
  let orderItems = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

    cart.forEach((order) => {
      orderItems.push({
        productId: order.id,
        quantity: order.quantity,
      });
    });
  }

  return orderItems;
};

export const deleteByProductId = (productId) => {
  let cart = [];
  let existedIndex = -1;

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

    existedIndex = cart.findIndex((p) => p.id === productId);

    if (existedIndex >= 0) {
      cart.splice(existedIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
