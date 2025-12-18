//variables
const productsPath = '/data/products.json'
//var to store product info
var products;

const statusText = document.getElementById("statusText");
const productList = document.getElementById("productList");

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
        div.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2');

        div.innerHTML = `
        <div class="card" >
        <img src="${product.imageSmall}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Product Decripption</p>
         <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `

        const productCard = document.createElement('div');
        productCard.classList.add('card', 'p-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');


        //--------create card elements
        //image
        const productImg = document.createElement('img');
        productImg.src = product.imageSmall;

        //name
        const productName = document.createElement('h5');
        productName.classList.add('card-title')
        productName.textContent = product.name;
    



        //add elements to card and add card to page
       
        productList.appendChild(div);
        // div.appendChild(productCard);
        // productCard.appendChild(cardBody);
        // cardBody.appendChild(productName);
        





    });
    statusText.textContent = `Showing ${filtered.length} products`;
    if (filtered.length == 0){
        statusText.textContent = statusText.textContent + ", adjust filters";
    }

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
//EVENT LISTENERS FOR FILTERS
//////////////////////////////////////////////////

// when user changes the category dropdown
categoryFilter.addEventListener("change", () => {
    //update filter value
    category = categoryFilter.value;
    RenderLaunches();  // re-filter and re-render
});
// when user changes flavour filter
flavourFilter.addEventListener("change", () => {
    //update filter value
    flavour = flavourFilter.value;
    RenderLaunches();  // re-filter and re-render
});
// when user changes size filter
sizeFilter.addEventListener("change", () => {
    //update filter value
    size = sizeFilter.value;
    RenderLaunches();  // re-filter and re-render
});
// when user changes price filter
priceFilter.addEventListener("change", () => {
    //update filter value
    price = priceFilter.value;
    RenderLaunches();  // re-filter and re-render
});
// when user changes inStock? filter
inStockFilter.addEventListener("change", () => {
    //update filter value
    inStock = inStockFilter.value;
    RenderLaunches();  // re-filter and re-render
});
// when user types in the search box
searchInput.addEventListener("input", () => {
    //update search variable
    searchTerm = searchInput.value.toLowerCase();
    RenderLaunches();  // re-filter and re-render
});