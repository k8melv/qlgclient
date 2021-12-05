const obj = JSON.parse(sessionStorage.getItem('user'));

const getCustomer = async () => {
    if (Array.isArray(obj) == true){
        var email = obj[3];
    }
    else{
        email = obj.email;
    }
    console.log(email);
    const plantURL = `https://qlgapi.herokuapp.com/api/customer/${email}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    populateFields(data);
    return data;
}

function populateFields(data){
    var main = document.getElementById("mainImage");
    var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${obj.firstName}</span><span class="text-black-50">${obj.email}</span><span> </span></div>`
    main.innerHTML = html;

    var fname = document.getElementById("fname");
    var html = `<div class='col-md-6'><label class='labels'>First Name</label><input type='text' class='form-control' placeholder='First Name' value='${data[0].firstName}'></div>`;
    fname.innerHTML = html;
    var lname = document.getElementById("lname");
    var html = `<div class='col-md-6'><label class='labels'>Last Name</label><input type='text' class='form-control' placeholder='Last Name' value='${data[0].lastName}'></div>`;
    lname.innerHTML = html;
    
    var email = document.getElementById("email");
    var html = `<div class='col-md-6'><label class='labels'>Email Address</label><input type='text' class='form-control' placeholder='Email Address' value='${data[0].email}'></div>`;
    email.innerHTML = html;

    if(data[0].shippingaddress === 'undefined'){
        var address = document.getElementById("aline1");
        var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' class='form-control' placeholder='Address Line' value='No current address on file'></div>`;
        address.innerHTML = html;
    }
    else{
        var address = document.getElementById("aline1");
        var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' class='form-control' placeholder='Address Line' value='${data[0].shippingaddress}'></div>`;
        address.innerHTML = html;
    }
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