const obj = JSON.parse(sessionStorage.getItem('user'));

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
    const profileApiUrl = `https://qlgapi.herokuapp.com/api/customer`;
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
            customerid: obj.customerid,
            firstname: firstName,
            lastname: lastName,
            birthdate: obj.birthdate,
            email: email,
            password: '',
            creditcard: '',
            shippingaddress: address,
            billingaddress: address,
            pastPurchases: obj.pastPurchases,
            status: obj.status
        })
    }).then((response)=>{
        if (response.status == 200){
            alert("Profile has been successfully saved!");
            //window.location.replace("../custProfile/custProfile.html");
            //populateFields();
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
            console.log(length + " getCart method");
            cartHtml.innerHTML = length;
        } 
    }   
    catch{
        cartHtml.innerHTML = '0';
    }
  }
  
  function removeProduct(id){
    console.log(id + " made it to remove")
    var items = JSON.parse(sessionStorage.getItem('myCart'));
    console.log(items);
    for (var i =0; i< items.length; i++) {
        var items = JSON.parse(items[i]);
        if (items.plantID == id) {
            items.splice(i, 8);
            break;
        }
    }
    items = JSON.stringify(items);
    console.log(items);
    sessionStorage.setItem('myCart', items);
  
    // console.log(id);
    // let storageProducts = JSON.parse(sessionStorage.getItem('myCart'));
    // let products = storageProducts.filter(product => product.id == id);
    // sessionStorage.splice('myCart', JSON.stringify(products));
    // console.log(JSON.parse(sessionStorage.getItem('myCart')));
    getCart();
    cartModal();
  }
  
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
            var parsedData = JSON.parse(data);
            html += `<p>${parsedData["plantName"]}: ${parsedData["price"]}<button id='removeButton' type="button" class="btn btn-danger" onclick='removeProduct(${parsedData["plantID"]})'>Remove</button></p>`
        });
        html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" onclick='checkoutModal()'>Checkout</button></div></div>`
        html += `</div>`
        document.getElementById("cartModal").innerHTML = html;
    }
  }
  
  function checkoutModal(){
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
    if (cart === null || cart === "null"){
        alert("Your cart is empty! Add plants before checking out");
    }
    else{
        var html = `<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Checkout</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        html += `</div><div class="modal-body">`
        var total;
        cart.forEach((data) => {
            var parsedData = JSON.parse(data);
            total = parsedData["price"];
            console.log(total);
            html += `<p>${parsedData["plantName"]}: ${parsedData["price"]}<button id='removeButton' type="button" class="btn btn-danger" onclick='removeProduct(${parsedData["plantID"]})'>Remove</button></p>`
        });
        html += `<div id="fname" class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="${obj.lastName}" value=""></div>`
        html += `<div id="lname" class="col-md-6"><label class="labels">Last Name</label><input type="text" class="form-control" value="" placeholder="${obj.lastName}"></div>`
        html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Submit</button></div></div>`
        html += `</div>`
        document.getElementById("checkoutModal").innerHTML = html;
    }
  }