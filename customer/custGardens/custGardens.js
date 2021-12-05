const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
  var helloHtml = document.getElementById('hello');
  var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../custProfile/custProfile.html">Hello ${obj.firstName}</a></li>`;
  helloHtml.innerHTML = html;
  loadGardens()
}

const GetGarden = async (id) => {
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden/${id}`;
  const response = await fetch(gardenURL);
  const data = await response.json();
  displayModal(data);
  return data;
}

function displayModal(data){
  var garden = document.getElementById("exampleModal");
  var html = `<div class="modal-dialog"><div class="modal-content">`;
  html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${data[0].gardenType}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  html += `</div><div class="modal-body"><img class="modalImg" src="./assets/garden-${data[0].gardenID}.jpg" alt="House Plants" width="300" height="200"/><div id="gardeninfo">${data[0].information}</div>`;
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

function getSlider(data, value){
  for (var i=1;i<=data.length;i++){
    if (value !== i){
      console.log("if")
      var garden = document.getElementById(`modalButton-${i}`);
      garden.classList.remove('selected');
    }
    else{
      displayGarden(i);
    }
  }
}

function displayGarden(i){
  console.log(i)
  var garden = document.getElementById(`modalButton-${i}`);
  garden.classList.add('selected');
}

function loadGardens(){
  const gardensURL = "https://qlgapi.herokuapp.com/api/garden";
  fetch(gardensURL).then(function(response){
      return response.json();
  }).then(function(json){
    var html = `<div class='gardens'>`
    json.forEach((garden) => {
        html += `<div class="garden">`;
        html += `<button id="modalButton-${garden.gardenID}" type="button" class="modalButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="GetGarden(${garden.gardenID})">`
        html += `<img id="myImg" src="./assets/garden-${garden.gardenID}.jpg" alt="${garden.gardenType}" width="300" height="200"/><h3 class="gardenText">${garden.gardenType}</h3></button>`
        html += "</div>";
      });
      html += "</div>";
      document.getElementById("gardenSection").innerHTML = html;
  }).catch(function(error){
      console.log(error);
  })
}