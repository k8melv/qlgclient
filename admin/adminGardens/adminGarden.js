const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../adminProfile/adminProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
    loadGardens();
}

const GetGarden = async (id) => {
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden/${id}`;
  const response = await fetch(gardenURL);
  const data = await response.json();
  displayModal(data);
  return data;
}

function displayModal(data){
  console.log(data);
  var garden = document.getElementById("exampleModal");
  var html = `<div class="modal-dialog"><div class="modal-content">`;
  html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${data[0].gardenType}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  html += `</div><div class="modal-body"><img class="modalImg" src="./assets/garden-${data[0].gardenID}.jpg" alt="House Plants" width="300" height="200"/><div style='display: flex;'><input type='text' id="gardenInfoForm" class='form-control' placeholder='Garden Information' value='${data[0].information}'></div></div>`;
  html += `<div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-danger" onclick="confirmation(${data[0].gardenID})">Delete</button><button type="button" class="btn btn-primary" onclick="putGarden(${data[0].gardenID})" method="PUT">Save changes</button>`;
  html += `</div></div></div></div>`;
  garden.innerHTML = html;
}

function confirmation(id){
  let isExecuted = confirm("Are you sure to delete this plant?");
  if (isExecuted == true) {
      alert("This garden has been deleted");
      removeElement(id);
  }
}  

function removeElement(id){
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden/${id}`;
  fetch(gardenURL, {
      method: "DELETE",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      }
  })
  .then((response)=>{
      console.log(response);
      loadGardens();
  })
}

function putGarden(id){
  const gardenURL = `https://qlgapi.herokuapp.com/api/garden/${id}`;
  const gardenInfo = document.getElementById(`gardenInfoForm`).value;
  console.log(gardenInfo)
  const gardenType = document.getElementById('exampleModalLabel').innerHTML;
  console.log(gardenType)
  fetch(gardenURL,{
      method: "PUT",
      headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        gardenID: id,
        gardenType: gardenType,
        information: gardenInfo  
      })
  }).then((response)=>{
      if (response.status == 200){
          alert("Garden has been successfully updated!");
          loadGardens();
      }
      else{
          alert("Something went wrong. Please try again");
      }
  })    
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