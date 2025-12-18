//variables
const productsPath = '/data/products.json'
//vars
var cart = getCart(); // function in shop.js

console.log('cart:', cart);

const message = document.getElementById('emptyMessage');

function updateEmptyCartMessage(){
    cart.length == 0
    ? message.classList.remove('d-none')
    : message.classList.add('d-none');

}
function updateCartTotal() {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.qty) * Number(item.price);
  });

  document.getElementById("cartTotal").textContent =
    `€${total.toFixed(2)}`;
}

updateEmptyCartMessage();
updateCartTotal()
renderCart();

//////////////////////////////////////////////////
//RENDER CART
//////////////////////////////////////////////////

function renderCart(){
    cartList.innerHTML = ""; //clear output

    // -------------- RENDER LOOP --------------
    cart.forEach((item) => {
        //make card
        const div = document.createElement('div');
        div.classList.add('col-12', 'product-card', 'm-0');

        div.innerHTML = `
            <div id="cardid:${item.id}" class="card mb-3 w-100" style="min-width: 320px">
                <div class="row g-0 align-items-center">

                    <div class="col-2">
                        <img src="${item.imageSmall}" class="img-fluid rounded-start" alt="Product image" style="max-width: 100%; max-height: 150px; object-fit: cover;">
                    </div>

        
                     <div class="col-10">
                        <div class="card-body py-2">
                            <h6 class="card-title fw-bold mb-1">
                                ${item.name} – ${item.size}
                                ${item.inStock
                                ? `<span class="badge ms-2 bg-success">In Stock</span>`
                                : `<span class="badge ms-2 bg-danger">Out of Stock</span>`
                                }
                            </h6>

                
                            <p class="card-text mb-1 text-muted">${item.flavour}</p>
                            <p class="card-text mb-1 text-muted">${item.brand}</p>
                            <p class="card-text mb-2 small">${item.description}</p>
                
                            <div class="d-flex flex-wrap align-items-center justify-content-end gap-3">

                                <span id="qtyid:${item.id}" class="small">Qty: ${item.qty}</span>
                                <div class="btn-group btn-group-sm" role="group">
                                    <button id="${item.id}" type="button" class="qty-minus btn btn-outline-primary">−</button>
                                    <button id="qtybtnid:${item.id}" type="button" class="btn btn-outline-primary">${item.qty}</button>
                                    <button id="${item.id}" type="button" class="qty-plus btn btn-outline-primary">+</button>
                                </div>
                                <span id="priceid:${item.id}" class="fw-semibold">€${(item.price * item.qty).toFixed(2)}</span>
                            </div>

                        </div>
                     </div>

                    </div>
                </div>`
        
        
        cartList.appendChild(div);

    });
}
//////////////////////////////////////////////////
//EVEN LISTENERS FOR EMPTY CART 
//////////////////////////////////////////////////
const emptyCartBtn = document.getElementById("emptyCartBtn");

emptyCartBtn.addEventListener("click", () => {

  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("checkoutfigure", "0");

  cart = [];
  cartList.innerHTML = "";
  updateEmptyCartMessage();
  updateCartFigure();
  updateCartTotal()
});

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
    event.preventDefault();

    //check if logged in
    var loggedin=localStorage.getItem('loggedIn'); 

    // if user is logged in 
    if (loggedin==1) {
        //bring to user details page
        window.location.href = "checkout";
    } 
    else {
        //set redirect page to checkout page so that when logged in it will redirect there
        localStorage.setItem('redirectAfterLogin', window.location.href = "checkout");

        //redirect to log in
        window.location.href = "login";
    }   

});


//////////////////////////////////////////////////
//EVEN LISTENERS FOR + - BUTTONS 
//////////////////////////////////////////////////
cartList.addEventListener("click", (e) => {

    //e.target is element clicked - go to element that was clicked,
    //if class not there, move to parent elements  and try look for any parent element with that class
    const minusBtn = e.target.closest(".qty-minus");
    const plusBtn = e.target.closest(".qty-plus");

    console.log("Button found:", e.target.closest(".qty-minus") || e.target.closest(".qty-plus"))

    //if cant find either - end function
    if (!minusBtn && !plusBtn) return;

    // ( button ids are same as its product id )  
    //so id of product were changing = minus btn id OR plus btn id    (whichever was found at click) 
    //so item id to edit:
    var id ;

    if (!minusBtn){
        id = plusBtn.id;
    }            
    else{
        id = minusBtn.id;
    }   
    //find item being affected in cart
    //converted to sting for comparison
    const item = cart.find((item) => String(item.id) === String(id));

    //if not found in cart end function
    if (!item) return;

    // if found and it was a plus btn that was clicked
    if (plusBtn) {
        console.log("Plus item", item.id)
        
        //set item qty to itself plus 1 (converted to number so can be added, since its stored as a string)
        item.qty = (Number(item.qty) || 1) + 1;
    }
    else if (minusBtn) {
        item.qty = (Number(item.qty) || 1) -1;

        //remove card if qty falls below 1
        if (item.qty < 1){
            // remove from cart array
            //filter out items from cart where item id is same as item id were removing + update local storage
            cart = cart.filter(p => String(p.id) !== String(item.id));
            localStorage.setItem("cart", JSON.stringify(cart));

            // remove card from DOM
            //get element with id
            const cardToRemove = document.getElementById(`cardid:${item.id}`);
            //if found, remove
            if (cardToRemove) cardToRemove.remove();

            //makde visible
            updateEmptyCartMessage();
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    

    var qtyBadge = JSON.parse(localStorage.getItem("checkoutfigure"));
    if(plusBtn){
        qtyBadge++
    }else {
        qtyBadge--
    }


    //update cart badge
    localStorage.setItem('checkoutfigure', JSON.stringify(qtyBadge));
    updateCartFigure() // function is in general.js
    updateCartTotal();
    //update qty
    //update qty btn
    //update price
    //update cart badge
    //get each element that needs updating fro document by id (ids are uniquie as they containt the product id)
    var qtyBadge = JSON.parse(localStorage.getItem("checkoutfigure"));
    var qtySpan =  document.getElementById(`qtyid:${item.id}`)
    var qtyBtn =  document.getElementById(`qtybtnid:${item.id}`)
    var priceSpan =  document.getElementById(`priceid:${item.id}`)

    //if found edit textcontent as needed
    if (qtySpan) {qtySpan.textContent = `Qty: ${item.qty}`;}
    if (qtyBtn) {qtyBtn.textContent  = String(item.qty); }
    if (priceSpan) {priceSpan.textContent   = `€${(Number(item.price) * Number(item.qty)).toFixed(2)}`;}

})
