const obj = JSON.parse(sessionStorage.getItem('user'));

const getCustomer = async () => {
    const customer = `https://qlgapi.herokuapp.com/api/customer/${obj.email}`;
    const response = await fetch(customer);
    const data = await response.json();
    populateFields(data);
    return data;
}

function populateFields(data){
    var main = document.getElementById("mainImage");
    var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${data[0].firstName}</span><span class="text-black-50">${data[0].email}</span><span> </span></div>`
    main.innerHTML = html;

    var fname = document.getElementById("fname");
    var html = `<div class='col-md-6'><label class='labels'>First Name</label><input type='text' id="editFname" class='form-control' placeholder='First Name' value='${data[0].firstName}'></div>`;
    fname.innerHTML = html;
    var lname = document.getElementById("lname");
    var html = `<div class='col-md-6'><label class='labels'>Last Name</label><input type='text' id="editLname" class='form-control' placeholder='Last Name' value='${data[0].lastName}'></div>`;
    lname.innerHTML = html;
    
    var email = document.getElementById("email");
    var html = `<div class='col-md-6'><label class='labels'>Email Address</label><input type='text' id="editEmail" class='form-control' placeholder='Email Address' value='${data[0].email}'></div>`;
    email.innerHTML = html;

    var address = document.getElementById("aline1");
    var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' id="editAddress"class='form-control' placeholder='Address Line' value='${data[0].billingAddress}'></div>`;
    address.innerHTML = html;
}

function saveProfile(){
    const profileApiUrl = `https://qlgapi.herokuapp.com/api/customer/${obj.customerID}`;
    const firstName = document.getElementById("editFname").value;
    const lastName = document.getElementById("editLname").value;
    const email = document.getElementById("editEmail").value;
    const address = document.getElementById("editAddress").value;
    fetch(profileApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            CustomerID: obj.customerID,
            FirstName: firstName,
            LastName: lastName,
            Birthdate: obj.birthdate,
            Email: email,
            Password: obj.password,
            CreditCard: '',
            ShippingAddress: address,
            BillingAddress: address,
            PastPurchases: obj.pastPurchases,
            Status: obj.status
        })
    }).then((response)=>{
        if (response.status == 200){
            alert("Profile has been successfully saved!");
            window.location.replace("../custProfile/custProfile.html");
        }
        else{
            alert("Something went wrong. Please try again");
        }
    })   
}
  
function getCart(){
    var cartHtml = document.getElementById("cartNum");
    var test = JSON.parse(sessionStorage.getItem("myCart"));
    try{
        if (test !== 'null'){
            let length = Object.keys(test).length;
            cartHtml.innerHTML = length;
        } 
    }   
    catch{
        cartHtml.innerHTML = '0';
    }
}

window.getCart = getCart;

function removeProduct(id){
    var items = JSON.parse(sessionStorage.getItem('myCart'));
    for (var i =0; i< items.length; i++) {
        var item = items[i];
        if (item.plantID == id) {
            items.splice(i, 1);
            break;
        }
    }
    sessionStorage.setItem('myCart', JSON.stringify(items));
    getCart();
    cartModal();
}

window.removeProduct = removeProduct;

function cartModal(){
	var cart = JSON.parse(sessionStorage.getItem("myCart"));
    if (cart === null || cart === "null"){
        var html = `<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Cart</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        html += `</div><div class="modal-body"><p>Your cart is empty</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Checkout</button>`
        html += `</div></div></div>`
        document.getElementById("cartModal").innerHTML = html;
    }
    else{
        var html = `<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Cart</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        html += `</div><div class="modal-body">`
        cart.forEach((data) => {
            var parsedData = data;
            html += `<p style="font-weight: 650;">${parsedData["plantName"]}: <p style="font-weight: 400;">${parsedData["price"]}<button style="margin-left: 10px;" id='removeButton' type="button" class="btn btn-danger" onclick='removeProduct(${parsedData["plantID"]})'>Remove</button></p></p>`
        });
        html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkoutModal" onclick='checkoutModal()'>Checkout</button></div></div>`
        html += `</div>`
        document.getElementById("cartModal").innerHTML = html;
    }
}

window.cartModal = cartModal;

function checkoutModal(){
	var cart = JSON.parse(sessionStorage.getItem("myCart"));
    if (cart === null || cart === "null"){
        alert("Your cart is empty! Add plants before checking out");
    }
    else{
        var html = `<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Checkout</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        html += `</div><div class="modal-body">`
        let total = 0;
        cart.forEach((data) => {
            var parsedData = data;
            var p = parsedData["price"];
            var price = p.split("$");
            total += parseFloat(price[1]);
            html += `<p style="font-weight: 650;">${parsedData["plantName"]}: <p style="font-weight: 400;">${parsedData["price"]}</p></p>`
        });
        html += `<p style="font-weight: 650;">Total: <p style="font-weight: 400">$${Math.round(total*100)/100}</p></p>`
        html += `<div class="col-md-6"><label class="labels">First Name:</label><input id="fname" type="text" class="form-control" placeholder="${obj.firstName}" value="${obj.firstName}"></div>`
        html += `<div class="col-md-6"><label class="labels">Last Name:</label><input type="text" id="lname" class="form-control" value="${obj.lastName}" placeholder="${obj.lastName}"></div>`
        html += `<div class="col-md-6"><label class="labels">Shipping Address:</label><input id="sadd" type="text" class="form-control" value="" placeholder="Shipping Address"></div>`
        html += `<div class="col-md-6"><label class="labels">Billing Address:</label><input type="text" id="badd" class="form-control" value="" placeholder="Billing Address"></div>`
        html += `<div class="col-md-6"><label for="ccn" class="labels">Credit Card Number:</label><input id="cc" type="tel" class="form-control" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"></div>`
        html += `<div class="col-md-6"><label class="labels">Expiration Date:</label><input id="expDate" type="month" class="form-control" placeholder=""></div>`
        html += `<div class="col-md-6"><label class="labels">CVV:</label><input id="cvv" type="number" inputmode="numeric" class="form-control" max="4" placeholder="----"></div>`
        html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="checkoutSubmit()">Submit</button></div></div>`
        html += `</div>`
        document.getElementById("checkoutModal").innerHTML = html;
    }
}

window.checkoutModal = checkoutModal;

function checkoutSubmit(){
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var shipping = document.getElementById('sadd').value;
    var billing = document.getElementById('badd').value;
    var cc = document.getElementById('cc').value;
    var exp = document.getElementById('expDate').value;
    var cvv = document.getElementById('cvv').value;
    if (fname == null || fname == "" || lname == null || lname == "" || shipping == null || shipping == "" || billing == null || billing == "" || cc == null || cc == "" || exp == null || exp == "" || cvv == null || cvv == ""){
        alert("You must fill out all fields before checking out.");
    }
    else{
        alert("Your order has been submitted!");
        sendOrderDatabase();
    }
}

window.checkoutSubmit = checkoutSubmit;

function sendOrderDatabase(){
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
    const customerApiUrl = `https://qlgapi.herokuapp.com/api/customer/${obj.customerID}`;
    fetch(customerApiUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            customerID: obj.customerID,
            firstName: obj.firstName,
            lastName: obj.lastName,
            birthdate: obj.birthdate,
            email: obj.email,
            password: obj.password,
            creditcard: " ",
            shippingaddress: obj.shippingaddress,
            billingaddress: obj.billingaddress,
            pastPurchases: cart,
            status: obj.status
        })
    })
    .then((response)=>{
        console.log(response); 
        sessionStorage.removeItem('myCart');
    })
}