function registerAccount(){
    const customerApiUrl = "https://qlgapi.herokuapp.com/api/admin";
    const firstName = document.getElementById(`fname`).value;
    const lastName = document.getElementById(`lname`).value;
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`pass`).value;
    const date = document.getElementById(`date`).value;
    const position = document.getElementById(`position`).value;

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