function registerAccount(){
    const customerApiUrl = "https://qlgapi.herokuapp.com/api/admin";
    const firstname = document.getElementById(`fname`).value;
    console.log(firstname);
    const lastname = document.getElementById(`lname`).value;
    console.log(lastname);
    const email2 = document.getElementById(`email`).value;
    const password2 = document.getElementById(`pass`).value;
    const date = document.getElementById(`date`).value;
    const position = document.getElementById(`position`).value;
    console.log(date);
    console.log(email2);
    console.log(password2);
    if(document.getElementById("termsAndCond").checked==true){
        fetch(customerApiUrl, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                email: email2,
                password: password2,
                position: position,
                startdate: date,
            })
        }).then((response)=>{
            console.log(response);
            var user = {firstname, lastname, email2, password2, position, date};
            sessionStorage.setItem('user', user)
            window.location.replace("../adminProfile/adminProfile.html");
        })
    }
    else{
        var errorMessage = document.getElementById("errorMsg");
        var html = "You must agree to the Terms and Conditions before registering your account.";
        errorMessage.innerHTML=html;
    }
}