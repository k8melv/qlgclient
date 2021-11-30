const obj = JSON.parse(sessionStorage.getItem('user'));

function handleHello(){
    var helloHtml = document.getElementById('hello');
    var html = `<li id="hello" class="nav-item accountPageButton"><a class="nav-link active" aria-current="page" href="../adminProfile/adminProfile.html">Hello ${obj.firstName}</a></li>`;
    helloHtml.innerHTML = html;
    loadPlants();
}

const GetPlant = async (id) => {
    const plantURL = `https://localhost:5001/api/plantinformation/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    displayModal(data);
    return data;
}

function displayModal(data){
    var garden = document.getElementById("exampleModal");
    var html = `<div class="modal-dialog"><div class="modal-content">`;
    html += `<div class="modal-header"><h5 class="modal-title" id="plantName">${data[0].plantName}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    html += `</div><div class="modal-body"><img class="modalImg" src="./assets/plant-${data[0].plantID}.jpeg" alt="Picture" width="300" height="200"/><div>Location: <input type="edit" value="${data[0].location}" id="editLocation"></div><div>Water Needs: <input type="edit" value="${data[0].numTimesWater}" id="editWater"></div><div>Sun Needs: <input type="edit" value="${data[0].sunNeeds}" id="editSun"></div><div id="plantinfo">Plant Information: <input type="edit" value="${data[0].information}"id="editInfo"></div><div>Fun Fact: <input type="edit" value="${data[0].funFact}" id="editFact"></div>`;
    html += `<div>Price: <input type="edit" value="${data[0].price}" id="editPrice"></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-danger" onclick="confirmation(${data[0].plantID})">Delete</button><button type="button" class="btn btn-primary" onclick="putPlant(${data[0].plantID})" method="PUT">Save Changes</button>`;
    html += `</div></div></div>`;
    garden.innerHTML = html;
}

function addPlant(){
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
        loadPlants();
    })
    var addMenu = document.getElementById("addButton");
    var html = `<button id = "adminAdd" class="btn btn-outline-dark" type="submit" onclick="displayAddMenu()">Add</button>`;
    addMenu.innerHTML = html;
}

function displayAddMenu(){
    var addMenu = document.getElementById("addModal");
    var html = `<div class="modal-dialog"><div class="modal-content">`;
    html += `<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Add Plant</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    html += `</div><div class="modal-body"><div>Plant Picture: <input class='input' type="file" value="Choose File" id="ppicture" accept='image/jpeg'></div><div>Plant Name: <input class='input' type="edit" value="Enter Name" id="pname"></div><div>Location: <input class='input' type="edit" value="Enter Location" id="plocation"></div><div>Water Needs: <input class='input' type="edit" value="Enter Water Needs" id="pwater"></div><div>Sun Needs: <input class='input' type="edit" value="Enter Sun Needs" id="psun"></div><div id="plantinfo">Plant Information: <input class='input' type="edit" value="Enter Plant Information" id="pinfo"></div><div>Fun Fact: <input class='input' type="edit" value="Enter Fun Fact" id="pfact"></div>`;
    html += ` <div>Price: <input class='input' type="edit" value="Enter Price" id="pprice"></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-secondary" onclick="addPlant()">Add Plant</button>`;
    html += `</div></div></div>`;
    addMenu.innerHTML = html;
}

function putPlant(id){
    const plantApiUrl = `https://localhost:5001/api/plantinformation/${id}`;
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

function confirmation(id){
    let isExecuted = confirm("Are you sure to delete this plant?");
    console.log(isExecuted); // OK = true, Cancel = false
    if (isExecuted == true) {
        alert("This plant has been deleted");
        removeElement(id);
    }
}  

function removeElement(id){
    const plantUrl = `https://localhost:5001/api/plantinformation/${id}`;
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

function loadPlants(){
    const allPlantsApiUrl = "https://localhost:5001/api/plantinformation";
    fetch(allPlantsApiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        let html = `<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">`;
        json.forEach((plantinformation) => {
            html += `<button type="button" class="modalButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="GetPlant(${plantinformation.plantID})">`;
            html += `<div class="col mb-5"> <div class="card h-100">  <img class="card-img-top" src="./assets/plant-${plantinformation.plantID}.jpeg" alt="${plantinformation.plantName}" height="200px"/>`;
            html += `<div class="card-body p-4"> <div class="text-center"> <h5 class="fw-bold">${plantinformation.plantName}</h5>${plantinformation.price}</div></div>`
            html += `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent"> <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View Plant Info</a></div></div></div></div></button>`
        });
        html += "</div>";
        document.getElementById("plantList").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    })
}

const getSuggestions = async () => {
    const suggestionURL = 'https://localhost:5001/api/submissions';
    const response = await fetch(suggestionURL);
    const data = await response.json();
    suggestionModal(data);
    return data;
}

function suggestionModal(data){
    let html = `<div class="modal-dialog" style="overflow-y: scroll">`;
    html += `<div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="submitModalLabel">Customer Submissions:</h5>`;
    html += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">`;
    html += `<div style='font-weight: bold;'>Plant:`
    data.forEach((suggestion) => {
        html += `<div style='font-weight: 400'>${suggestion.plant}<button style='margin: 5px; justify-content: flex-end;' id="adminAdd" class="btn btn-outline-dark" type="submit" onclick="displayAddMenu()">Add</button><button style='justify-content: flex-end;' type="button" class="btn btn-danger" onclick="confirmDelete(${suggestion.id})">Delete</button></div>`;
    });
        html += `</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div>`;
    html += "</div>";
    document.getElementById("submitModal").innerHTML = html;
}

function deleteSubmission(id){
    const suggestionURL = `https://localhost:5001/api/submissions/${id}`;
    fetch(suggestionURL, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
    })
}

function confirmDelete(id){
    let isExecuted = confirm("Are you sure to delete this suggestion?");
    console.log(isExecuted); // OK = true, Cancel = false
    if (isExecuted == true) {
        alert("This submission has been deleted");
        deleteSubmission(id);
    }
} 


    
            
        
    

