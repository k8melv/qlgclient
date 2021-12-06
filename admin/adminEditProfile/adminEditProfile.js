const obj = JSON.parse(sessionStorage.getItem('user'));

const GetAdmin = async () => {
    const adminURL = `https://qlgapi.herokuapp.com/api/admin/${obj.email}`;
    const response = await fetch(adminURL);
    const data = await response.json();
    populateFields(data);
    return data;
}

function populateFields(data){
    // var main = document.getElementById("mainImage");
    // var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${data[0].firstName}</span><span class="text-black-50">${data[0].email}</span><span> </span></div>`
    // main.innerHTML = html;

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

function changePhoto(){
    
}