
//////////////////////////////////////////////////
//General js file to update things
//this script is ran with every page reload
//////////////////////////////////////////////////


// check the checkout figure 
// {if non existant set value to 0} 
//////////////////////////////////////////////////
//figure beside cart icon
if (localStorage.getItem('checkoutfigure') == null) {  
    localStorage.setItem('checkoutfigure',0);
}
//logged in status
if (localStorage.getItem('loggedIn') == null) {  
    localStorage.setItem('loggedIn',0);
}


//TO UPDATE THE CART FIGURE IN HTML (if changed)
function updateCartFigure() {
    //get element
    var checkout = localStorage.getItem('checkoutfigure');
    //set element to above var 
    document.getElementById('checkoutfigure').innerHTML = checkout;
};
//not an iffe bc its used later in other functions
updateCartFigure()


// run to update login/
var logout = document.getElementById('loginlogout');

// add a listener for add to login/out if button id is pressed
document.getElementById('loginlogout').addEventListener('click', (event) => {
    event.preventDefault();

    //get logged in state
    var loggedin=localStorage.getItem('loggedIn'); 

    // if user is logged in them log them out and redirect to home page
    if (loggedin==1) {
        localStorage.setItem('loggedIn',0);
 
        window.location.href = "/";
    // else lredirtect to log in page
    } else {
        //save current(redirect) page
        localStorage.setItem('redirectAfterLogin', window.location.pathname);

        window.location.href = "login";
    }   
})

// EVENT LISTENER FOR USER DETAILS BTN
document.getElementById('userdetails').addEventListener('click', (event) => {
    event.preventDefault();

    //check if logged in
    var loggedin=localStorage.getItem('loggedIn'); 

    // if user is logged in 
    if (loggedin==1) {
        //bring to user details page
        window.location.href = "userdetails";
    } 
    else {
        //set redirect page to userDetails page so that when logged in it will redirect there
        localStorage.setItem('redirectAfterLogin', window.location.href = "userdetails");

        //redirect to log in
        window.location.href = "login";
    }   

})

// check if user is logged in or logged out..
checkLoginStatus()

function checkLoginStatus() {
    
    var loggedin=localStorage.getItem('loggedIn'); 
    var element = document.getElementById("userdetails");
    if (loggedin==1) {
        // change the text from Login to Logout
        document.querySelector('#loginlogout').innerHTML="Logout";
        // element.classList.remove("d-none");        
        // element.classList.add("d-show");      
    } else{
        // use add to hide the display of User Details
        //element.classList.add("d-none");        
        //element.classList.remove("d-show");

        document.querySelector('#loginlogout').innerHTML="Login / Register"; 
        element = document.getElementById("loginlogout");

        element.setAttribute("href", "login.html");
        var element = document.getElementById("userdetails");
        // element.style.display = 'none';
    } 

}
