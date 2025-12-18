//variables
const productsPath = '/data/products.json'
//vars
const message = document.getElementById('emptyMessage');

//all products , 
var products = [];
var items =[];

//fetch all products
//method is passed the file path, returns json format of the contents
async function getProducts(productsPath) {
    
  try {
    console.log("Fetching products...");
    const response = await fetch(productsPath);
    if (!response.ok) throw new Error("HTTP error: " + response.status);

    const products = await response.json();
    console.log(products);
    return products;

  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}
//IIFE to fetch all product info and start rendering
(async () => {
  products = await getProducts(productsPath);
  console.log("products info: " + products)
  renderCart();
})();

items.length == 0
  ? message.classList.remove('d-none')
  : message.classList.add('d-none');


function renderCart(){
    cartList.innerHTML = ""; //clear output

    // -------------- RENDER LOOP --------------
    items.forEach((item) => {
        //make card
        const div = document.createElement('div');
        div.classList.add('col-12', 'product-card');

        //vars depend on instock bool
        const disabled = item.inStock ? "" : "disabled";
        const btnText = item.inStock ? "+ Add to Cart" : "Out of Stock";

        div.innerHTML = `
        <div class="card" >
            <img src="${item.imageSmall}" class="card-img-top" alt="...">
            <div class="card-body">
                ${item.inStock
                    ? `<span class="badge my-2 me-2 bg-success">In Stock</span>`
                    : `<span class="badge my-2 me-2 bg-danger">Out of Stock</span>`
                }
                ${item.bestseller
                ? `<span class="badge my-2 bg-warning">Bestseller</span>`
                : ""
                }
                
                <h5 class="card-title">${item.name} - ${item.size}</h5>
                <label>Flavour:</label>
                <p class="card-text">${item.flavour}</p>
                <p class="card-text">&euro;${item.price}</p>
                <button id="${item.id}" class="btn btn-primary m-1 addtocart ${disabled} ">${btnText}</button>
            </div>
        </div>

        < div class="card mb-3" style = "max-width: 540px;" >
                <div class="row g-0">
                    <div class="col-md-4">
                        img src="${item.imageSmall}" class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
        </div >
        
        `

        cartList.appendChild(div);

    });
    // statusText.textContent = `Showing ${filtered.length} products`;
    // if (filtered.length == 0) {
    //     statusText.textContent = statusText.textContent + ", adjust filters";
    // }

}


