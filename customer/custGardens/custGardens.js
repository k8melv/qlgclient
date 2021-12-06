import { ref, getDownloadURL, storage } from "../../firebase/firebase.js";

const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
  var helloHtml = document.getElementById('hello');
  var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
  helloHtml.innerHTML = html;
  loadGardens()
}

window.handleHello = handleHello;

const GetGarden = async (id) => {
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden/${id}`;
  const response = await fetch(gardenURL);
  const data = await response.json();
  displayModal(data);
  return data;
}

window.GetGarden = GetGarden;

async function displayModal(data){
  const photoUrl = await getPhoto(data[0].gardenID);
  var garden = document.getElementById("exampleModal");
  var html = `<div class="modal-dialog"><div class="modal-content">`;
  html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${data[0].gardenType}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  html += `</div><div class="modal-body"><img class="modalImg" src="${photoUrl}" alt="../../assets/BigLogo_Transparent.png" width="300" height="200"/><div id="gardeninfo">${data[0].information}</div>`;
  html += `</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
  html += `</div></div></div>`;
  garden.innerHTML = html;
}

const slider = async (value) => {
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden`;
  const response = await fetch(gardenURL);
  const data = await response.json();
  getSlider(data, value);
  return data;
}

window.slider = slider;

function getSlider(data, value){
  for (var i=1;i<=data.length;i++){
    if (value == i){
      var garden = document.getElementById(`modalButton-${i}`);
      garden.classList.add('selected');
    }
    else{
      var garden = document.getElementById(`modalButton-${i}`);
      garden.classList.remove('selected');
    }
  }
}

async function loadGardens(){
  const gardensURL = "https://qlgapi.herokuapp.com/api/garden";
  var response = await fetch(gardensURL);
  const json = await response.json();
    var html = `<div class='gardens'>`;
    for (const garden of json){
      var photoUrl = '../../assets/ElephantLogo_Transparent.png';
      try {
        photoUrl = await getPhoto(garden.gardenID);
      } catch (error) {
        console.log(error);
      }
      html += `<div class="garden">`;
      html += `<button id="modalButton-${garden.gardenID}" type="button" class="modalButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="GetGarden(${garden.gardenID})">`
      html += `<img id="myImg" src="${photoUrl}" alt="../../assets/ElephantLogo_Transparent.png" width="300" height="200"/><h3 class="gardenText">${garden.gardenType}</h3></button>`
      html += "</div>";
    }
  html += "</div>";
  document.getElementById("gardenSection").innerHTML = html;
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

window.getCart = getCart

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

window.checkoutModal = checkoutModal;

async function getPhoto(id){
  try {
    const thisUrl =  await getDownloadURL(ref(storage, `garden/garden-${id}.jpg`))
    return thisUrl;
  } catch (error) {
    console.log("Could not get photos");
  }
}

window.getPhoto = getPhoto;