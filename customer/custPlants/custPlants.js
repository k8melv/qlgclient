const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
    loadPlants();
}

const GetPlant = async (id) => {
    const plantURL = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    displayModal(data);
    return data;
}

function displayModal(data){
    var garden = document.getElementById("exampleModal");
    var html = `<div class="modal-dialog"><div class="modal-content">`;
    html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${data[0].plantName}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    html += `</div><div class="modal-body"><img class="modalImg" src="./assets/plant-${data[0].plantID}.jpeg" alt="Picture" width="300" height="200"/><div>Location: ${data[0].location}</div><div>Water Needs: ${data[0].numTimesWater}</div><div>Sun Needs: ${data[0].sunNeeds}</div><div id="plantinfo">Plant Information: ${data[0].information}</div><div>Fun Fact: ${data[0].funFact}</div>`;
    html += `<div>Price: ${data[0].price}</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" onclick="GetPlantCart(${data[0].plantID})">Add to Cart</button>`;
    html += `</div></div></div>`;
    garden.innerHTML = html;
}

const GetPlantCart = async (id) => {
    const plantURL = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    addToCart(data);
    return data;
}

if (sessionStorage.getItem("myCart")){
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
} 
else{
    var cart = [];
} 

async function addToCart(data){
    var test = JSON.parse(sessionStorage.getItem("myCart"));
    if (test === null || test === "null"){
        cart = [];
        var cartHtml = document.getElementById("cartNum");
        var productName = data[0].plantName;
    
        cart.push(JSON.stringify(data[0]));
        alert(productName + " has successfully been added to your cart");
        
        sessionStorage.setItem("myCart", JSON.stringify(cart));
        let length = Object.keys(cart).length;
        cartHtml.innerHTML = length;
    }
    else{
        console.log('else')
        var cartHtml = document.getElementById("cartNum");
        var productName = data[0].plantName;
    
        cart.push(JSON.stringify(data[0]));
        alert(productName + " has successfully been added to your cart");
        
        sessionStorage.setItem("myCart", JSON.stringify(cart));
        let length = Object.keys(cart).length;
        cartHtml.innerHTML = length;
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
        html += `<div id="fname" class="col-md-6"><label class="labels">First Name:</label><input type="text" class="form-control" placeholder="${obj.lastName}" value=""></div>`
        html += `<div id="lname" class="col-md-6"><label class="labels">Last Name:</label><input type="text" class="form-control" value="" placeholder="${obj.lastName}"></div>`
        html += `<div id="lname" class="col-md-6"><label class="labels">Shipping Address:</label><input type="text" class="form-control" value="" placeholder="Shipping Address"></div>`
        html += `<div id="lname" class="col-md-6"><label class="labels">Billing Address:</label><input type="text" class="form-control" value="" placeholder="Billing Address"></div>`
        html += `<div id="lname" class="col-md-6"><label class="labels">Credit Card:</label><input type="text" class="form-control" value="" placeholder="Credit Card"></div>`
        html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Submit</button></div></div>`
        html += `</div>`
        document.getElementById("checkoutModal").innerHTML = html;
    }
}

function loadPlants(){
    const allPlantsApiUrl = "https://qlgapi.herokuapp.com/api/plantinformation";
    fetch(allPlantsApiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        let html = `<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">`;
        json.forEach((plantinformation) => {
            html += `<button type="button" class="modalButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="GetPlant(${plantinformation.plantID})">`;
            html += `<div class="col mb-5"> <div class="card h-100">  <img class="card-img-top" src="./assets/plant-${plantinformation.plantID}.jpeg" alt="${plantinformation.plantName}" height="200px"/>`;
            html += `<div class="card-body p-4"> <div class="text-center"> <h5 class="fw-bold">${plantinformation.plantName}</h5>${plantinformation.price}</div></div>`;
            html += `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent"> <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View Plant Info</a></div></div></div></div></button>`;
        });
        html += "</div>";
        document.getElementById("plantList").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    })
}

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