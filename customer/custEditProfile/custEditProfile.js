/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const obj = JSON.parse(sessionStorage.getItem('user'));
console.log(obj);

// const GetCustomers = async (id) => {
//     const customerURL = `https://localhost:5001/api/customer/${id}`;
//     const response = await fetch(customerURL);
//     const data = await response.json();
//     console.log(data);
//     populateFields(data);
//     return data;
// }

function populateFields(){
    var main = document.getElementById("mainImage");
    var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${obj.firstName}</span><span class="text-black-50">${obj.email}</span><span> </span></div>`
    main.innerHTML = html;

    var fname = document.getElementById("fname");
    var html = `<div class='col-md-6'><label class='labels'>First Name</label><input type='text' id="editFname" class='form-control' placeholder='First Name' value='${obj.firstName}'></div>`;
    fname.innerHTML = html;
    var lname = document.getElementById("lname");
    var html = `<div class='col-md-6'><label class='labels'>Last Name</label><input type='text' id="editLname" class='form-control' placeholder='Last Name' value='${obj.lastName}'></div>`;
    lname.innerHTML = html;
    
    var email = document.getElementById("email");
    var html = `<div class='col-md-6'><label class='labels'>Email Address</label><input type='text' id="editEmail" class='form-control' placeholder='Email Address' value='${obj.email}'></div>`;
    email.innerHTML = html;

    var address = document.getElementById("aline1");
    var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' id="editAddress"class='form-control' placeholder='Address Line' value='${obj.billingAddress}'></div>`;
    address.innerHTML = html;
    

}

function saveProfile(){
    const profileApiUrl = `https://qlgapi.herokuapp.com/api/customer/${obj.customerid}`;
    const firstName = document.getElementById("editFname");
    const lastName = document.getElementById("editLname");
    const email = document.getElementById("editEmail");
    const address = document.getElementById("editAddress");
    fetch(profileApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            CustomerID: obj.customerid,
            FirstName: firstName,
            LastName: lastName,
            Birthdate: obj.Birthdate,
            Email: email,
            Password: obj.Password,
            CreditCard: obj.CreditCard,
            ShippingAddress: address,
            BillingAddress: address,
            PastPurchases: obj.PastPurchases,
            Status: obj.Status
        })
    }).then((response)=>{
        if (response.status == 200){
            alert("Profile has been successfully saved!");
            populateFields();
        }
        else{
            alert("Something went wrong. Please try again");
        }
    })   
}