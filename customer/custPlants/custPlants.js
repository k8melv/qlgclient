import { ref, getDownloadURL, storage } from "../../firebase/firebase.js";

const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    if (obj.firstName == null || obj.firstName == "null"){
        alert("You must log in first");
        window.location.replace("../../carousel.html")
    }
    else{
        var helloHtml = document.getElementById('hello');
        var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
        helloHtml.innerHTML = html;
        loadPlants();
    }
}

window.handleHello = handleHello;

const GetPlant = async (id) => {
    const plantURL = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    displayModal(data);
    return data;
}

window.GetPlant = GetPlant;

async function displayModal(data){
    const photoUrl = await getPhoto(data[0].plantID);
    var garden = document.getElementById("exampleModal");
    var html = `<div class="modal-dialog"><div class="modal-content">`;
    html += `<div class="modal-header"><h5 class="modal-title" id="plantName">${data[0].plantName}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    html += `</div><div class="modal-body"><img class="modalImg" src="${photoUrl}" alt="Picture" width="300" height="200"/><div style="font-weight: 650">Location: <p style="font-weight: 400;">${data[0].location}</p></div><div style="font-weight: 650">Water Needs: <p style="font-weight: 400;">${data[0].numTimesWater}</p></div><div style="font-weight: 650">Sun Needs: <p style="font-weight: 400;">${data[0].sunNeeds}</p></div><div id="plantinfo" style="font-weight: 650">Plant Information: <p style="font-weight: 400;">${data[0].information}</p></div><div style="font-weight: 650">Fun Fact: <p style="font-weight: 400;">${data[0].funFact}</p></div>`;
    html += `<div style="font-weight: 650">Price: <p style="font-weight: 400;">${data[0].price}</p></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="GetPlantCart(${data[0].plantID})">Add to Cart</button>`;
    html += `</div></div></div>`;
    garden.innerHTML = html;
}

window.displayModal = displayModal;

const GetPlantCart = async (id) => {
    const plantURL = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    addToCart(data);
    return data;
}

window.GetPlantCart = GetPlantCart;

if (sessionStorage.getItem("myCart")){
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
} 
else{
    var cart = [];
} 

function addToCart(data){
    var test = JSON.parse(sessionStorage.getItem("myCart"));
    if (test === null || test === "null"){
        cart = [];
        var cartHtml = document.getElementById("cartNum");
        var productName = data[0].plantName;
    
        cart.push(data[0]);
        alert(productName + " has successfully been added to your cart");
        
        sessionStorage.setItem("myCart", JSON.stringify(cart));
        let length = Object.keys(cart).length;
        cartHtml.innerHTML = length;
    }
    else{
        cart = JSON.parse(sessionStorage.getItem("myCart"));
        var cartHtml = document.getElementById("cartNum");
        var productName = data[0].plantName;
    
        cart.push(data[0]);
        alert(productName + " has successfully been added to your cart");
        
        sessionStorage.setItem("myCart", JSON.stringify(cart));
        let length = Object.keys(cart).length;
        cartHtml.innerHTML = length;
    }
}

// window.addToCart = addToCart;

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

async function loadPlants(){
    const allPlantsApiUrl = "https://qlgapi.herokuapp.com/api/plantinformation";
    var response = await fetch(allPlantsApiUrl);
    const json = await response.json();
        let html = `<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">`;
        for (const plantinformation of json){
            var photoUrl = '../../assets/ElephantLogo_Transparent.png';
            try {
                photoUrl = await getPhoto(plantinformation.plantID);
            } catch (error) {
                console.log(error);
            }
            html += `<button type="button" class="modalButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="GetPlant(${plantinformation.plantID})">`;
            html += `<div class="col mb-5"><div class="card h-100"><img class="card-img-top" src='${photoUrl}' alt="../../assets/ElephantLogo_Transparent.png" height="200px"/>`;
            html += `<div class="card-body p-4"> <div class="text-center"> <h5 class="fw-bold">${plantinformation.plantName}</h5>${plantinformation.price}</div></div>`
            html += `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent"> <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View Plant Info</a></div></div></div></div></button>`
        }
    html += "</div>";
    document.getElementById("plantList").innerHTML = html;
}

// window.loadPlants = loadPlants;

function sendSuggestion(){
    const suggestionURL = 'https://qlgapi.herokuapp.com/api/submissions';
    const plant = document.getElementById(`plantSubmission`).value;

    fetch(suggestionURL, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            plant: plant,
        })
    })
    .then((response)=>{
        if (response.status == 200){
            alert("Your suggestion has been successfully submitted!");
        }
        else{
            alert("Something went wrong. Please try again.")
        }
        console.log(response);
    })
}

window.sendSuggestion = sendSuggestion;

async function getPhoto(id){
    try {
        const thisUrl =  await getDownloadURL(ref(storage, `images/plant-${id}.jpg`))
        return thisUrl;
    } catch (error) {
        console.log("Could not get photos");
    }
}

// window.getPhoto = getPhoto;