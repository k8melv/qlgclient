function registerAccount(){
    const customerApiUrl = "https://qlgapi.herokuapp.com/api/admin";
    const firstName = document.getElementById(`fname`).value;
    const lastName = document.getElementById(`lname`).value;
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`pass`).value;
    const date = document.getElementById(`date`).value;
    const position = document.getElementById(`position`).value;

    var emailCheck = email.split('@');
    console.log(emailCheck[1]);
    if (emailCheck[1] !== 'qlg.com'){
        var errorMessage = document.getElementById("errorMsg");
        var html = `You are not an admin. Please register through the <a href="../../customer/custRegister/custRegister.html" target="_blank" download><label>customer registration</label></a>`;
        errorMessage.innerHTML=html;
    }
    else if (firstName == null || firstName == "" || lastName == null || lastName == "" || email == null || email == "" || password == null || password == "" || date == null || date == "" || position == null || position == ""){
        var errorMessage = document.getElementById("errorMsg");
        var html = "You must fill out all information";
        errorMessage.innerHTML=html;
    }
    else{
        if(document.getElementById("termsAndCond").checked==true){
            fetch(customerApiUrl, {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    position: position,
                    startdate: date,
                })
            }).then((response)=>{
                console.log(response);
                var user = {firstName, lastName, email, password, position, date};
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.replace("../adminProfile/adminProfile.html");
            })
        }
        else{
            var errorMessage = document.getElementById("errorMsg");
            var html = "You must agree to the Terms and Conditions before registering your account.";
            errorMessage.innerHTML=html;
        }
    }
}