//get cart
const cart = JSON.parse(localStorage.getItem("cart"));

//then Clear cart in local storage
localStorage.setItem("cart", JSON.stringify([]));

// ELEMENTS FROM HTML
const summaryItems = document.getElementById("summaryItems");
const subtotalText = document.getElementById("subtotalText");
const shippingText = document.getElementById("shippingText");
const totalText = document.getElementById("totalText");

const orderNumberText = document.getElementById("orderNumber");
const deliveryEstimateText = document.getElementById("deliveryEstimate");
const deliveryAddressText = document.getElementById("deliveryAddress");



// fill in items + totals (order summary)
function renderSummary() {
  
  summaryItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    const qty = Number(item.qty) || 1;
    const price = Number(item.price) || 0;
    const lineTotal = qty * price;
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
    `;
    
    summaryItems.appendChild(row);
  });

  //free shipping above 50eur
  const shipping = subtotal > 50 
  ? 0 
  : 4.99;
  const total = subtotal + shipping;

    //fill in in html
    subtotalText.textContent = `€${subtotal.toFixed(2)}`;
    shippingText.textContent = `€${shipping.toFixed(2)}`;
    totalText.textContent = `€${total.toFixed(2)}`;
}

function fillOrderDetails() {
  // Order number - random (current date and time)
  orderNumberText.textContent = `ORD-645434`;

  // Delivery estimate
  deliveryEstimateText.textContent = "2–4 working days";

  //last order - billing details:
  const billingDetails = JSON.parse(localStorage.getItem("billingDetails"));

  if (billingDetails) {
    deliveryAddressText.textContent = `${billingDetails.address1} ,${billingDetails.city} ,${billingDetails.county}`;
  }

}
renderSummary();
fillOrderDetails();