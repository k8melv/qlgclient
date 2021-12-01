/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function registerAccount(){
    const customerApiUrl = "https://localhost:5001/api/customer";
    const firstname = document.getElementById(`fname`).value;
    console.log(firstname);
    const lastname = document.getElementById(`lname`).value;
    console.log(lastname);
    const birthdate = document.getElementById(`birthdate`).value;
    console.log(birthdate);
    const email2 = document.getElementById(`email`).value;
    console.log(email2);
    const password2 = document.getElementById(`password`).value;
    console.log(password2);
    console.log(document.getElementById("subscribeToEmails").checked)
    if(document.getElementById("subscribeToEmails").checked==true){
        var status="yes";
    }
    else{
        var status="no";
    }
    if(document.getElementById("termsAndCond").checked==true){
        fetch(customerApiUrl, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                birthdate: birthdate,
                email: email2,
                password: password2,
                status: status
            })
        })
        .then((response)=>{
            console.log(response);
        })
    }
    else{
        var errorMessage = document.getElementById("errorMsg");
        var html = "You must agree to the Terms and Conditions before registering your account.";
        errorMessage.innerHTML=html;
    }
}