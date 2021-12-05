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
    var score = answer2+answer3;
    console.log(score);
    var scoreLabel = calculateScore(score);
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

function calculator2Database(){//STILL NEEDS TO BE WORKED ON
  const calculatorApiUrl = "https://qlgapi.herokuapp.com/api/plantinformation";
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