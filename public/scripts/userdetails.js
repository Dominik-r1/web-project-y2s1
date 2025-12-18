

 
// if (localStorage.getItem('userDetails') === null) {  

//     // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
//     var userDetails = {firstName:"Walter", lastName:"Mitty", dob:"1990-12-01",address1:"Buenos Ayres Drive", address2:"Strandhill", address3:"Co. Sligo"};
    
//     // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
//     // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
//     document.getElementById("firstNameID").setAttribute('value',userDetails.firstName);
//     document.getElementById("lastNameID").setAttribute('value',userDetails.lastName);
//       localStorage.setItem('userdetails',JSON.stringify(userDetails));
//   document.getElementById("dobID").setAttribute('value',userDetails.dob);
//     document.getElementById("address1ID").setAttribute('value',userDetails.address1);       
//     document.getElementById("address2ID").setAttribute('value',userDetails.address2);
//     document.getElementById("address3ID").setAttribute('value',userDetails.address3);
// } else {
//     // if localstorage variable userdetails is already created - load it to javascript oject. 
//     // JSON.parse turns it back into an javascript object
//     userDetails=JSON.parse(localStorage.getItem('userDetails'));

//     document.getElementById("firstNameID").setAttribute('value',userDetails.firstName);
//     document.getElementById("lastNameID").setAttribute('value',userDetails.lastName);
//     document.getElementById("emailAddressID").setAttribute('value',userDetails.emailAddress);
    
// }

//get user detail suubject from local storage
userDetails=JSON.parse(localStorage.getItem('userDetails'));

    //input details into the form on page
    document.getElementById("firstNameID").setAttribute('value',userDetails.firstName);
    document.getElementById("lastNameID").setAttribute('value',userDetails.lastName);
    document.getElementById("emailAddressID").setAttribute('value',userDetails.emailAddress);