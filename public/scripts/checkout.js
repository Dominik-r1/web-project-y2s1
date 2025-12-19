
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

//ELEMENTS FROM HTML
const checkoutForm = document.getElementById("checkoutForm");
//items in order summary
const orderItems = document.getElementById("orderItems");
const subtotalText = document.getElementById("subtotalText");
const shippingText = document.getElementById("shippingText");
const totalText = document.getElementById("totalText");

const placeOrderBtn = document.getElementById("placeOrderBtn");


let cart = getCart();

//fill in cart items
function renderSummary() {
  orderItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {

    const qty = item.qty;
    const price = item.price;
    const lineTotal = Number(qty) * Number(price);
    subtotal += lineTotal;

    const row = document.createElement("div");
    row.className = "d-flex justify-content-between align-items-start mb-2";

    row.innerHTML = `
        <div class="me-3">
        <div class="fw-semibold">${item.name} - ${item.size}</div>

        <div class="small text-muted">${item.brand} - ${item.flavour}</div>

        <div class="small">Qty: ${qty}</div>
        </div>
        <div class="text-end fw-semibold">€${lineTotal.toFixed(2)}</div>
        `

    orderItems.appendChild(row);
  });

    // free shipping on order above 50
    const shipping = 
    subtotal > 50 
    ? 0 
    : 4.99;
    const total = subtotal + shipping;

    //append to html
    if (subtotalText) subtotalText.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingText) shippingText.textContent = `€${shipping.toFixed(2)}`;
    if (totalText) totalText.textContent = `€${total.toFixed(2)}`;
}

renderSummary();
//fill in prices and totals

// get user details
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

//input details into the form on page if they exist
if (userDetails.firstName) document.getElementById("firstName").setAttribute('value', userDetails.firstName);
if (userDetails.lastName) document.getElementById("lastName").setAttribute('value', userDetails.lastName);
if (userDetails.emailAddress) document.getElementById("email").setAttribute('value', userDetails.emailAddress);
if (userDetails.address1) document.getElementById("address1").setAttribute('value', userDetails.address1);
if (userDetails.address2) document.getElementById("address2").setAttribute('value', userDetails.address2);
if (userDetails.city) document.getElementById("city").setAttribute('value', userDetails.city);
if (userDetails.eircode) document.getElementById("eircode").setAttribute('value', userDetails.eircode);



//browser validation before posting
checkoutForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // start browser validation manually since default was prevented
  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  if (cart.length === 0) return;

  //IF SUCCESSFUL 

  //Save billing details 
  /////////////////////////////////////////////////////////////////////////////////////////////
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const emailAddress = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address1 = document.getElementById("address1").value;
  const address2 = document.getElementById("address2").value;
  const country = document.getElementById("country").value;
  const county = document.getElementById("county").value;
  const city = document.getElementById("city").value;
  const eircode = document.getElementById("eircode").value;
  //create user object 
  const billingDetails = { firstName, lastName, emailAddress, phone, address1, address2, country, county, city, eircode };

  //save to local storage
  localStorage.setItem('billingDetails', JSON.stringify(billingDetails));

  /////////////////////////////////////////////////////////////////////////////////////////////
  
  //clear cart badge value for next page
  localStorage.setItem("checkoutfigure", "0");
  // renderSummary();

  // redirect to confirmation screen
  window.location.href = 'purchaseConfirmation'
});