//try get user details object
var userDetails = JSON.parse(localStorage.getItem('userDetails'));


//if user details obj exists
if (userDetails) { 

    //get user details from local storage
    userDetails=JSON.parse(localStorage.getItem('userDetails'));  

    ///if it exists , fill them into the form
    if(userDetails.firstName) document.getElementById("firstNameID").setAttribute('value',userDetails.firstName);
    if(userDetails.lastName) document.getElementById("lastNameID").setAttribute('value',userDetails.lastName);
    if(userDetails.emailAddress) document.getElementById("emailAddressID").setAttribute('value',userDetails.emailAddress); 
    if(userDetails.address1) document.getElementById("address1").setAttribute('value',userDetails.address1); 
    if(userDetails.address2) document.getElementById("address2").setAttribute('value',userDetails.address2); 
    if(userDetails.city) document.getElementById("city").setAttribute('value',userDetails.city);    
    if(userDetails.eircode) document.getElementById("eircode").setAttribute('value',userDetails.eircode);  

};

// on detail update click
document.getElementById('udetails').addEventListener('submit', (event) => {

    // if the user updates the user details - make a new details object and assign values
    var userDetails={};
    userDetails.firstName = document.getElementById('firstNameID').value;
    userDetails.lastName = document.getElementById('lastNameID').value;
    userDetails.emailAddress = document.getElementById('emailAddressID').value;
    userDetails.address1 = document.getElementById('address1').value;   
    userDetails.address2 = document.getElementById('address2').value;
    userDetails.city = document.getElementById('city').value; 
    userDetails.eircode = document.getElementById('eircode').value; 

  
    // convert the object to a string with JSON.stringify and rewrite it to localstorage
    localStorage.setItem('userDetails',JSON.stringify(userDetails));

    event.preventDefault();

});