

document.getElementById('user-login').addEventListener('submit', (event) => {
  // wait for submit button to be clicked on login form - 
    // this code only invoked if login form submit button clicked

    //form input
    var inputEmail = document.getElementById('emailAddressID').value;
    var inputPassword= document.getElementById('passwordID').value;

    //get registered user
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var email = userDetails.emailAddress
    var password = userDetails.password


    if (inputEmail== email && inputPassword == password)  {   
        // successful login, user redirected to previous page
        localStorage.setItem('loggedIn',1);  
        
        var prevPage = localStorage.getItem('redirectAfterLogin');
        //dont bring back to register
        if( prevPage == "/register" || "/login" ){prevPage = '/'}
        window.location.href = prevPage;  // redirect to page previous to login

    }
    else {
        // alert("invalid login details");
        // login unsuccessful, error message appears
        localStorage.setItem('loggedIn',0);
        var element = document.getElementById("errormessage");
        element.classList.remove("d-none");
        element.classList.remove("d-block");
    }
    event.preventDefault();
  });


