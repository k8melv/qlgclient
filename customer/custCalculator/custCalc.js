/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank NOT ANYMORE!!
// Use this file to add JavaScript to your project. NO YOU DO IT!

// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var healthScore = document.getElementById("phealth");
var modalImg = document.getElementById("img01");
var plantName = document.getElementById("pname");
var sunScore = document.getElementById("sunscore");
var waterScore = document.getElementById("waterscore");
var advice = document.getElementById("advice");
var captionText = document.getElementById("caption");
img.onclick = function(){
  if(counter>=4){
    console.log(answer3);
    console.log(answer2);
    var score = parseInt(answer2)+parseInt(answer3);
    console.log(score);
    var scoreLabel = calculateScore(score);
    console.log(scoreLabel);
    var adviceLabel = calculateAdvice();
    modal.style.display = "block";
    healthScore.innerHTML=`Your Plant is: ${scoreLabel}`;
    modalImg.src = imageID;
    captionText.innerHTML = this.alt;
    plantName.innerHTML = `Plant Name: ${answer1}`;
    sunScore.innerHTML = `Sun Score: ${ans2Emoji}`;
    waterScore.innerHTML = `Water Score: ${ans3Emoji}`;
    advice.innerHTML = `Advice: ${adviceLabel}`;
    calculator2Database();
  }
  

}

function calculator2Database(){
  const calculatorApiUrl = "https://qlgapi.herokuapp.com/api/healthcalculator";
  const namePlant = answer1;
  const sunScore = answer2;
  const waterScore = answer3;
    fetch(calculatorApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'

        },
        body: JSON.stringify({
            PlantType: namePlant,
            WaterScore: waterScore,
            SunScore: sunScore,
        })
    })
    .then((response)=>{
        console.log(response);
    })


}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

const obj = JSON.parse(sessionStorage.getItem('user'));
console.log(obj);

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
}

// Stores the answers for the calculator
var counter=0;
var answer1;
var answer2;
var answer3;
var answer4;
var ans2Emoji;
var ans3Emoji;
var imageID;

function calculateScore(score){
  if(score>=8){
    return "Healthy";
  }
  else if(score<8 && score>=4){
    return "Moderately Healthy";
  }
  else if(score<4){
    return "Unhealthy";
  }
}

function calculateAdvice(){
  var advice="You should "
  if(answer3<4&&answer2<4){
    advice+= "get your plant more sunlight and water your plant more often.";
  }
  else if(answer2<4){
    advice+="get your plant more sunlight ";
  }
  else if(answer3<4){
    advice+= "water your plant more often.";
  }

  if(answer2>=4&&answer3>=4){
    advice+="Keep doing what you are doing!";
  }
  return advice;
}


function question1(id){
  answer1=document.getElementById(id).innerHTML;
  if(id=="q1c1"){imageID=`./assets/plant-1.jpeg`;}
  else if(id=="q1c2"){imageID=`./assets/plant-2.jpeg`;}
  else if(id=="q1c3"){imageID=`./assets/plant-3.jpeg`;}
  else if(id=="q1c4"){imageID=`./assets/plant-4.jpeg`;}
  else if(id=="q1c5"){imageID=`./assets/plant-5.jpeg`;}

  counter++;

}
function question2(id){
  counter++;
  answer2=document.getElementById(id).innerHTML;
  if(answer2=="A nearby window"){
    ans2Emoji="🌞🌞🌞";
    answer2="3";
  }
  if(answer2=="Direct exposure outside"){
      ans2Emoji="🌞🌞🌞🌞🌞";
      answer2="5";
  }
  if(answer2=="A heat lamp"){
    ans2Emoji="🌞🌞🌞🌞";
    answer2="4";
  }
  if(answer2=="It doesn't...."){
    ans2Emoji="🌞";
    answer2="1";
  }
}
function question3(id){
  counter++;
  answer3=document.getElementById(id).innerHTML;
  if(answer3=="Once a day"){
    ans3Emoji="💧💧💧💧💧";
    answer3="5";
  }
  if(answer3=="Once a week"){
    ans3Emoji="💧💧"
    answer3="2";
  }
  if(answer3=="Whenever it rains"){
    ans3Emoji="💧💧💧";
    answer3="3";
  }
  if(answer3=="Never"){
    ans3Emoji="💧";
    answer3="1";
  }
}
function question4(id){
  counter++;
  answer4=document.getElementById(id).innerHTML;
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