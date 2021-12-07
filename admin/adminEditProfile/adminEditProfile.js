import { uploadProfile, ref, getDownloadURL, storage } from "../../firebase/firebase.js";

const obj = JSON.parse(sessionStorage.getItem('user'));

const GetAdmin = async () => {
    const adminURL = `https://qlgapi.herokuapp.com/api/admin/${obj.email}`;
    const response = await fetch(adminURL);
    const data = await response.json();
    populateFields(data);
    return data;
}

window.GetAdmin = GetAdmin;

async function populateFields(data){
    const photoUrl = await getPhoto(data[0].email)
    var main = document.getElementById("mainImage");
    var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="${photoUrl}" alt="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${data[0].firstName}</span><span class="text-black-50">${data[0].email}</span><span> </span></div>`
    html += `<button type="button" class="btn btn-info" data-toggle="modal" data-target="#uploadModal" onclick="displayModal()">Change Photo</button>`
    main.innerHTML = html;

    var fname = document.getElementById("fname");
    var html = `<div class='col-md-6'><label class='labels'>First Name</label><input type='text' id="editFirst" class='form-control' placeholder='First Name' value='${data[0].firstName}'></div>`;
    fname.innerHTML = html;

    var lname = document.getElementById("lname");
    var html = `<div class='col-md-6'><label class='labels'>Last Name</label><input type='text' id="editLast" class='form-control' placeholder='Last Name' value='${data[0].lastName}'></div>`;
    lname.innerHTML = html;
    
    var email = document.getElementById("email");
    var html = `<div class='col-md-6'><label class='labels'>Email Address</label><input type='text' id="editEmail" class='form-control' placeholder='Email Address' value='${data[0].email}'></div>`;
    email.innerHTML = html;

    var position = document.getElementById("adminPos");
    var html = `<div class='col-md-6'><label class='labels'>Position</label><input type='text' id="editPosition" class='form-control' placeholder='Email Address' value='${data[0].position}'></div>`;
    position.innerHTML = html;

    var date = document.getElementById("startDate");
    var html = `<div class='col-md-6'><label class='labels'>Start Date</label><input type='text' id="editDate" class='form-control' placeholder='Email Address' value='${data[0].startDate}'></div>`;
    date.innerHTML = html;
}

function updateProfile(){
    const profileApiUrl = `https://qlgapi.herokuapp.com/api/admin/${obj.adminID}`;
    const firstName = document.getElementById(`editFirst`).value;
    const lastName = document.getElementById(`editLast`).value;
    const email = document.getElementById(`editEmail`).value;
    const position = document.getElementById(`editPosition`).value;
    const date = document.getElementById(`editDate`).value;
    fetch(profileApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            AdminID: obj.adminID,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: obj.password,
            Position: position,
            StartDate: date,
        })
    }).then((response)=>{
        if (response.status == 200){
            alert("Profile has been successfully updated!");
            window.location.replace("../adminProfile/adminProfile.html");
        }
        else{
            alert("Something went wrong. Please try again");
        }
    })    
}

window.updateProfile = updateProfile;

function displayModal(){
    const pic = '';
    var modalhtml = document.getElementById("uploadModal");
    var html = `<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="submitModalLabel">File Upload Form</h5>`
    html += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">`
    html += `<form method='post' action='' enctype="multipart/form-data">Select file : <input class='form-control' type="file" value="Choose File" id="ppicture" accept='image/jpg' onchange="pic = event"><br>`
    html += `<input type='button' class='btn btn-info' value='Upload' id='btn_upload' onsubmit="addPhoto(pic)"></form><div id='preview'></div></div>`
    html += `<div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`
    modalhtml.innerHTML = html;
}

window.displayModal = displayModal;

async function addPhoto(event){
    var selectedFile = event.target.files[0];
    var data = obj.email
    uploadProfile(selectedFile, data);
}

window.addPhoto = addPhoto;

async function getPhoto(email){
    try {
        const thisUrl =  await getDownloadURL(ref(storage, `profile/propic-${email}.jpg`))
        return thisUrl;
    } catch (error) {
        console.log("Could not get photos");
    }
}

window.getPhoto = getPhoto;