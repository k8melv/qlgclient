const obj = JSON.parse(sessionStorage.getItem('user'));
console.log(obj);

const getCustomer = async () => {
    if (Array.isArray(obj) == true){
        var id = obj[3];
    }
    else{
        var id = obj.customerid;
    }
    const plantURL = `https://qlgapi.herokuapp.com/api/customer/${id}`;
    const response = await fetch(plantURL);
    const data = await response.json();
    populateFields(data);
    return data;
}

function populateFields(data){
    var main = document.getElementById("mainImage");
    var html = `<div class="d-flex flex-column align-items-center text-center p-3 py-5" id="mainImage"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">${obj.firstName}</span><span class="text-black-50">${obj.email}</span><span> </span></div>`
    main.innerHTML = html;

    var fname = document.getElementById("fname");
    var html = `<div class='col-md-6'><label class='labels'>First Name</label><input type='text' class='form-control' placeholder='First Name' value='${data.firstName}'></div>`;
    fname.innerHTML = html;
    var lname = document.getElementById("lname");
    var html = `<div class='col-md-6'><label class='labels'>Last Name</label><input type='text' class='form-control' placeholder='Last Name' value='${data.lastName}'></div>`;
    lname.innerHTML = html;
    
    var email = document.getElementById("email");
    var html = `<div class='col-md-6'><label class='labels'>Email Address</label><input type='text' class='form-control' placeholder='Email Address' value='${data.email}'></div>`;
    email.innerHTML = html;

    if(data.shippingaddress === undefined){
        var address = document.getElementById("aline1");
        var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' class='form-control' placeholder='Address Line' value='No current address on file'></div>`;
        address.innerHTML = html;
    }
    else{
        var address = document.getElementById("aline1");
        var html = `<div class='col-md-6'><label class='labels'>Address Line</label><input type='text' class='form-control' placeholder='Address Line' value='${data.shippingaddress}'></div>`;
        address.innerHTML = html;
    }

}