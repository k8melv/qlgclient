import { uploadImage, ref, getDownloadURL, storage } from "../../firebase/firebase.js";

const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../adminProfile/adminProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
    loadPlants();
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
    html += `</div><div class="modal-body"><img class="modalImg" src="${photoUrl}" alt="Picture" width="300" height="200"/><div style="font-weight: 650">Location: <input class="form-control" type="edit" value="${data[0].location}" id="editLocation"></div><div style="font-weight: 650">Water Needs: <input class="form-control" type="edit" value="${data[0].numTimesWater}" id="editWater"></div><div style="font-weight: 650">Sun Needs: <input class="form-control" type="edit" value="${data[0].sunNeeds}" id="editSun"></div><div id="plantinfo" style="font-weight: 650">Plant Information: <input class="form-control" type="edit" value="${data[0].information}" id="editInfo"></div><div style="font-weight: 650">Fun Fact: <input class="form-control" type="edit" value="${data[0].funFact}" id="editFact"></div>`;
    html += `<div style="font-weight: 650">Price: <input class="form-control" type="edit" value="${data[0].price}" id="editPrice"></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-danger" onclick="confirmation(${data[0].plantID})">Delete</button><button type="button" class="btn btn-primary" onclick="putPlant(${data[0].plantID})" method="PUT">Save Changes</button>`;
    html += `</div></div></div>`;
    garden.innerHTML = html;
}

function addPlant(pic){
    const plantApiUrl = "https://qlgapi.herokuapp.com/api/plantinformation";
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
            PlantName: namePlant,
            Location: plantLocation,
            NumTimesWater: waterNeeds,
            SunNeeds: sunNeed,
            Information: plantInfo,
            FunFact: plantFact,
            Price: plantPrice
        })
    })
    .then((response)=>{
        console.log(response);
        addPhoto(pic);
        loadPlants();
    })
    var addMenu = document.getElementById("addButton");
    var html = `<button id = "adminAdd" class="btn btn-outline-dark" type="submit" onclick="displayAddMenu()">Add</button>`;
    addMenu.innerHTML = html;
}

window.addPlant = addPlant;

function displayAddMenu(){
    const pic = '';
    var addMenu = document.getElementById("addModal");
    var html = `<div class="modal-dialog"><div class="modal-content">`;
    html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Add Plant</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    html += `</div><div class="modal-body"><div style="font-weight: 650;">Plant Picture: <input class='form-control' type="file" value="Choose File" id="ppicture" accept='image/jpg' onchange="pic = event"></div><div style="font-weight: 650;">Plant Name: <input class='form-control' type="edit" placeholder="Enter Name" id="pname"></div><div style="font-weight: 650;">Location: <input class='form-control' type="edit" placeholder="Enter Location" id="plocation"></div><div style="font-weight: 650;">Water Needs: <input class='form-control' type="edit" placeholder="Enter Water Needs" id="pwater"></div><div style="font-weight: 650;">Sun Needs: <input class='form-control' type="edit" placeholder="Enter Sun Needs" id="psun"></div><div id="plantinfo" style="font-weight: 650;">Plant Information: <input class='form-control' type="edit" placeholder="Enter Plant Information" id="pinfo"></div><div style="font-weight: 650;">Fun Fact: <input class='form-control' type="edit" placeholder="Enter Fun Fact" id="pfact"></div>`;
    html += ` <div style="font-weight: 650;">Price: <input class='form-control' type="edit" placeholder="Enter Price" id="pprice"></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" onclick="addPlant(pic)">Add Plant</button>`;
    html += `</div></div></div>`;
    addMenu.innerHTML = html;
}

window.displayAddMenu = displayAddMenu;

function putPlant(id){
    const plantApiUrl = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    const namePlant = document.getElementById(`plantName`).innerHTML;
    const plantLocation = document.getElementById(`editLocation`).value;
    const waterNeeds = document.getElementById(`editWater`).value;
    const sunNeed = document.getElementById(`editSun`).value;
    const plantInfo = document.getElementById(`editInfo`).value;
    const plantFact = document.getElementById(`editFact`).value;
    const plantPrice = document.getElementById(`editPrice`).value;
    fetch(plantApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            PlantID: id,
            PlantName: namePlant,
            Location: plantLocation,
            NumTimesWater: waterNeeds,
            SunNeeds: sunNeed,
            Information: plantInfo,
            FunFact: plantFact,
            Price: plantPrice
        })
    }).then((response)=>{
        if (response.status == 200){
            alert("Plant has been successfully updated!");
            loadPlants();
        }
        else{
            alert("Something went wrong. Please try again");
        }
    })    
}

window.putPlant = putPlant;

function confirmation(id){
    let isExecuted = confirm("Are you sure to delete this plant?");
    if (isExecuted == true) {
        alert("This plant has been deleted");
        removeElement(id);
    }
}  

window.confirmation = confirmation;

function removeElement(id){
    const plantUrl = `https://qlgapi.herokuapp.com/api/plantinformation/${id}`;
    fetch(plantUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
        loadPlants();
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

const getSuggestions = async () => {
    const suggestionURL = 'https://qlgapi.herokuapp.com/api/submissions';
    const response = await fetch(suggestionURL);
    const data = await response.json();
    suggestionModal(data);
    return data;
}

window.getSuggestions = getSuggestions;

function suggestionModal(data){
    let html = `<div class="modal-dialog">`;
    html += `<div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="submitModalLabel">Customer Submissions:</h5>`;
    html += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">`;
    html += `<div style='font-weight: bold;'>Plant:`
    data.forEach((suggestion) => {
        html += `<div style='font-weight: 400'>${suggestion.plant}<button style='justify-content: flex-end; float: right; margin: 5px' type="button" class="btn btn-danger" onclick="confirmDelete(${suggestion.id})">Delete</button><button style='margin: 5px; justify-content: flex-end; float: right;' id="adminAdd" class="btn btn-outline-dark" type="submit" data-bs-toggle="modal" data-bs-target="#addModal" onclick="displayAddMenu()">Add</button></div>`;
    });
        html += `</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div>`;
    html += "</div>";
    document.getElementById("submitModal").innerHTML = html;
}

function deleteSubmission(id){
    const suggestionURL = `https://qlgapi.herokuapp.com/api/submissions/${id}`;
    fetch(suggestionURL, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    suggestionModal();
}

function confirmDelete(id){
    let isExecuted = confirm("Are you sure to delete this suggestion?");
    if (isExecuted == true) {
        alert("This submission has been deleted");
        deleteSubmission(id);
    }
}

window.confirmDelete = confirmDelete;

const getHighestId = async () => {
    const plantURL = `https://qlgapi.herokuapp.com/api/plantinformation/highestid`;
    const response = await fetch(plantURL);
    const data = await response.json();
    return data;
}

window.getHighestId = getHighestId;

async function addPhoto(event){
    var selectedFile = event.target.files[0];
    var data = await getHighestId()
    uploadImage(selectedFile, data[0].plantID);
}

window.addPhoto = addPhoto;

async function getPhoto(id){
    try {
        const thisUrl =  await getDownloadURL(ref(storage, `images/plant-${id}.jpg`))
        return thisUrl;
    } catch (error) {
        console.log("Could not get photos");
    }
}

window.getPhoto = getPhoto;