 
 var prevPage = localStorage.getItem('redirectAfterLogin');
 localStorage.setItem('redirectAfterLogin',JSON.stringify(prevPage));

document.getElementById('user-register').addEventListener('submit', (event) => { 

    var email = document.getElementById('emailAddressID').value;
    var password= document.getElementById('passwordID').value;

    //registration validation success
    if (true) 
    {
        var firstName = document.getElementById("firstNameID").value;
        var lastName = document.getElementById("lastNameID").value;
        var emailAddress = document.getElementById("emailAddressID").value;
        var password = document.getElementById("passwordID").value;
        
        //create user object 
        var userDetails = { firstName, lastName, emailAddress, password };

         //save to local storage
        localStorage.setItem('userDetails',JSON.stringify(userDetails));
        
        //log user in
        localStorage.setItem('loggedIn',1);

        window.location.href = prevPage || "/";  // redirect to page previous to regsitration
        event.preventDefault();
    }
    //registration failure
    else{

    }


})