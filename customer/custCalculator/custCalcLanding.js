const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
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