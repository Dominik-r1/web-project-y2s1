//variables
const productsPath = '/data/products.json'
//var to store product info
var products;

const statusText = document.getElementById("statusText");
const productList = document.getElementById("productList");
const message = document.getElementById('outOfStockAlert');

//filter ids
const categoryFilter = document.getElementById("categoryFilter");
const flavourFilter = document.getElementById("flavourFilter")
const sizeFilter = document.getElementById("sizeFilter")
const priceFilter = document.getElementById("priceFilter")
const inStockFilter = document.getElementById("inStockFilter")
const searchInput = document.getElementById("searchInput");

//set detault filter values
let category = "all";
let flavour = "all";
let size = "all"
let price = "all";
let inStock = "all";
let searchTerm = "";

// FETCH DATA FROM JSON FILE
//////////////////////////////////////////////////
async function fetchJSON(path) {
    //get data
    let response = await fetch(path);

    //chekc for error
    if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
    }

    //return data
    return await response.json();
};

// FILTER FUNCTION
//////////////////////////////////////////////////
function filterProducts(products){
    //--------- Filter by category--------- 
    if (category !== "all") {
        // filtered = filter products (where product => category is === to current selected category)
        products = products.filter(product => product.category === category);
    }

    //--------- Filter by flavour--------- 
    //--------- Filter by size--------- 
    //--------- Filter by price--------- 
    //--------- Filter by InStock--------- 
    //--------- Filter by search--------- 

    return products;

};

//RENDER LOOP
//////////////////////////////////////////////////
function renderProducts(){
    productList.innerHTML = ""; //clear output

    // -------------- FILTER --------------
    let filtered = filterProducts(products);

    console.log(filtered);

    // -------------- RENDER LOOP --------------
    filtered.forEach((product) => {
        //make card
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-xxl-2');

        //vars depend on instock bool
        const disabled = product.inStock ? "" : "disabled";
        const btnText = product.inStock ? "+ Add to Cart" : "Out of Stock";

        div.innerHTML = `
        <div class="card" >
            <img src="${product.imageSmall}" class="card-img-top" alt="...">
            <div class="card-body">
                ${product.inStock
                    ? `<span class="badge my-2 bg-success">In Stock</span>`
                    : `<span class="badge my-2 bg-danger">Out of Stock</span>`
                }
                <h5 class="card-title">${product.name} - ${product.size}</h5>
                <label>Flavour:</label>
                <p class="card-text">${product.flavour}</p>
                <p class="card-text">&euro;${product.price}</p>
                <button id="${product.id}" class="btn btn-primary m-1 addtocart ${disabled}">${btnText}</button>
            </div>
        </div>
        `

        productList.appendChild(div);

    });
    statusText.textContent = `Showing ${filtered.length} products`;
    if (filtered.length == 0) {
        statusText.textContent = statusText.textContent + ", adjust filters";
    }

}

function disableOuOfStock (){
    let 
}


//IIFE
//////////////////////////////////////////////////
(async function start() {

    try {

        console.log("Fetching products...");
        products = await fetchJSON(productsPath);

        console.log(products);

        renderProducts();

    } catch (err) {
        console.error('Error fetching data:', err);
        statusText.textContent = "Unable to fetch data at this time."
    }
})();

//////////////////////////////////////////////////
//EVENT LISTENERS FOR ADD_TO_CART (evenbt delagation)
//////////////////////////////////////////////////
productList.addEventListener("click", (e) => {
    //clear out of stock message
    message.classList.add('d-none');

    //go to clicked element and find closest element with class "addtocart"
    const btn = e.target.closest(".addtocart");
    //if cant find - end function
    if (!btn) return;  
    // ( button ids are same as its product id )                       
    const id = btn.id
    //search for product with same id as btn clicked
    products.forEach((product) => {
        
        if (product.id == id){
            addToCart(product);
        }
    });

})
//////////////////////////////////////////////////
//EVENT LISTENERS FOR FILTERS
//////////////////////////////////////////////////

// when user changes the category dropdown
categoryFilter.addEventListener("change", () => {
    //update filter value
    category = categoryFilter.value;
    renderProducts();  // re-filter and re-render
});
// when user changes flavour filter
flavourFilter.addEventListener("change", () => {
    //update filter value
    flavour = flavourFilter.value;
    renderProducts();  // re-filter and re-render
});
// when user changes size filter
sizeFilter.addEventListener("change", () => {
    //update filter value
    size = sizeFilter.value;
    renderProducts();  // re-filter and re-render
});
// when user changes price filter
priceFilter.addEventListener("change", () => {
    //update filter value
    price = priceFilter.value;
    renderProducts();  // re-filter and re-render
});
// when user changes inStock? filter
inStockFilter.addEventListener("change", () => {
    //update filter value
    inStock = inStockFilter.value;
    renderProducts();  // re-filter and re-render
});
// when user types in the search box
searchInput.addEventListener("input", () => {
    //update search variable
    searchTerm = searchInput.value.toLowerCase();
    renderProducts();  // re-filter and re-render
});