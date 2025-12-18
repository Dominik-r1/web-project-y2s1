
//fetch cart object
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
//set the cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//get cart, 
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
    cart.push({ id: product.id, name: product.name, qty: 1 });
  }

  //update cart qty figure
  JSON.parse(localStorage.getItem("checkoutfigure"));
  var qtyBadge = JSON.parse(localStorage.getItem("checkoutfigure"));
  qtyBadge++
  localStorage.setItem('checkoutfigure', JSON.stringify(qtyBadge));
updateCartFigure()
  

  saveCart(cart);
}
