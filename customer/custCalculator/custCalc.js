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
    sunScore.innerHTML = `Sun Score: ${answer2}`;
    waterScore.innerHTML = `Water Score: ${answer3}`;
    advice.innerHTML = `Advice: ${adviceLabel}`;
    //calculator2Database();
  }
  

}

function calculator2Database(){//STILL NEEDS TO BE WORKED ON
  const plantApiUrl = "https://localhost:5001/api/plantinformation";
  const namePlant = document.getElementById(`pname`).value;
  const plantLocation = document.getElementById(`plocation`).value;
    const waterNeeds = document.getElementById(`pwater`).value;
    const sunNeed = document.getElementById(`psun`).value;
    const plantInfo = document.getElementById(`pinfo`).value;
    const plantFact = document.getElementById(`pfact`).value;
    const plantPrice = document.getElementById(`pprice`).value;
    

    fetch(plantApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'

        },
        body: JSON.stringify({
            plantName: namePlant,
            location: plantLocation,
            numTimesWater: waterNeeds,
            sunNeeds: sunNeed,
            information: plantInfo,
            funFact: plantFact,
            price: plantPrice
        })
    })
    .then((response)=>{
        console.log(response);
        loadPlants();
    })
    var addMenu = document.getElementById("addButton");
    var html = `<button id = "adminAdd" class="btn btn-outline-dark" type="submit" onclick="displayAddMenu()">Add</button>`;
    addMenu.innerHTML = html;

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
    answer2="3"
  }
  if(answer2=="Direct exposure outside"){
      answer2="5"
  }
  if(answer2=="A heat lamp"){
    answer2="4"
  }
  if(answer2=="It doesn't...."){
    answer2="1";
  }
}
function question3(id){
  counter++;
  answer3=document.getElementById(id).innerHTML;
  if(answer3=="Once a day"){
    answer3="5"
  }
  if(answer3=="Once a week"){
    answer3="2"
  }
  if(answer3=="Whenever it rains"){
    answer3="3";
  }
  if(answer3=="Never"){
    answer3="1"
  }
}
function question4(id){
  counter++;
  answer4=document.getElementById(id).innerHTML;
}