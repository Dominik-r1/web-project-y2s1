

//fetch cart object
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
  //returns array of items in cart
}
//set the cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//add item to cart
function addToCart(product) {
  const cart = getCart();

  //see if product is already in cart
  //check every item in cart,   return if item.id is same as product.id we want to add
  const existing = cart.find(item => item.id === product.id);

   //if item were adding found in cart, just increase qty
  if (existing) {
    existing.qty += 1;
  }
  //else use array method .push to add item to the cart (array of objects)
   else {
      cart.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          description: product.description,
          imageSmall: product.imageSmall,
          size: product.size,
          flavour: product.flavour,
          caloriesPerServing: product.caloriesPerServing,
          price: product.price,
          inStock: product.inStock,
          bestseller: product.bestseller,
          qty: 1,

      });
  }

  //update cart qty figure
  JSON.parse(localStorage.getItem("checkoutfigure"));
  var qtyBadge = JSON.parse(localStorage.getItem("checkoutfigure"));
  qtyBadge++
  localStorage.setItem('checkoutfigure', JSON.stringify(qtyBadge));
  updateCartFigure()
   
  saveCart(cart);
}
