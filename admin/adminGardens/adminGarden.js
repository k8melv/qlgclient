import { ref, getDownloadURL, storage, uploadGarden } from "../../firebase/firebase.js";

const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
  var helloHtml = document.getElementById('hello');
  var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../adminProfile/adminProfile.html">Hello ${obj.firstName}</a></li>`;
  helloHtml.innerHTML = html;
  loadGardens();
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
  html += `</div><div class="modal-body"><img class="modalImg" src="${photoUrl}" alt="House Plants" width="300" height="200"/><div style='display: flex;'><input type='text' id="gardenInfoForm" class='form-control' placeholder='Garden Information' value='${data[0].information}'></div></div>`;
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

window.confirmation = confirmation;

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

window.putGarden = putGarden;

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

function displayAddMenu(){
  const pic = '';
  var addMenu = document.getElementById("addModal");
  var html = `<div class="modal-dialog"><div class="modal-content">`;
  html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Add Garden</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  html += `</div><div class="modal-body"><div>Garden Picture: <input class='input' type="file" value="Choose File" id="gpic" accept='image/jpg' onchange="pic = event"></div><div>Garden Type: <input class='input' type="edit" placeholder="Enter Type" id="gtype"></div><div>Garden Information: <input class='input' type="edit" placeholder="Enter Information" id="ginfo"></div>`;
  html += ` </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" onclick="addGarden(pic)">Add Garden</button>`;
  html += `</div></div></div>`;
  addMenu.innerHTML = html;
}

window.displayAddMenu = displayAddMenu;

function addGarden(pic){
  const plantApiUrl = "https://qlgapi.herokuapp.com/api/garden";
  const gardenType = document.getElementById(`gtype`).value;
  const gardenInfo = document.getElementById(`ginfo`).value;
  
  fetch(plantApiUrl, {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        gardenType: gardenType,
        information: gardenInfo
      })
  })
  .then((response)=>{
      console.log(response);
      addPhoto(pic);
      loadGardens();
  })
  // var addMenu = document.getElementById("addButton");
  // var html = `<button id = "adminAdd" class="btn btn-outline-dark" type="submit" onclick="displayAddMenu()">Add</button>`;
  // addMenu.innerHTML = html;
}

window.addGarden = addGarden;

const getHighestId = async () => {
  const plantURL = `https://qlgapi.herokuapp.com/api/garden/gardenhighestid`;
  const response = await fetch(plantURL);
  const data = await response.json();
  return data;
}

window.getHighestId = getHighestId;

async function addPhoto(event){
  var selectedFile = event.target.files[0];
  var data = await getHighestId()
  uploadGarden(selectedFile, data[0].gardenID);
}

window.addPhoto = addPhoto;

async function getPhoto(id){
  try {
    const thisUrl =  await getDownloadURL(ref(storage, `garden/garden-${id}.jpg`))
    return thisUrl;
  } catch (error) {
    console.log("Could not get photos");
  }
}

window.getPhoto = getPhoto;