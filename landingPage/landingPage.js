/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// sticky nav bar
// window.onscroll = function() {myFunction()};

// var stickyNav = document.getElementById("stickyNav");
// var sticky = stickyNav.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     stickyNav.classList.add("sticky")
//   } else {
//     stickyNav.classList.remove("sticky");
//   }
// }
const GetCustomers = async (email) => {
    const customerURL = `https://qlgapi.herokuapp.com/api/customer/${email}`;
    const response = await fetch(customerURL);
    const data = await response.json();
    console.log(data);
    loginOnClick(data)
    return data;
}

function handleOnLoad(email){
    const postURL = `https://qlgapi.herokuapp.com/api/customer/${email}`;
    fetch(postURL).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        loginOnClick(json);
    }).catch(function(error){
        console.log(error);
    });
}

async function loginOnClick(json) {
    var emailval = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    try{
        if (emailval=json[0].email)
        {
            if (pass=json[0].password)
            {
                var user = json[0];
                sessionStorage.setItem('user', JSON.stringify(user));

                window.location.replace("../customer/custProfile/custProfile.html");
            }
        }
    }
    catch{
        var html = "<input type='password' id='pass' name='password' placeholder='Password'><br><br><div style='color: red'>Incorrect email or password. Try again</div>";
        document.getElementById("pass").outerHTML = html
    }
}