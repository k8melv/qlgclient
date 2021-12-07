function registerAccount(){
    const customerApiUrl = "https://qlgapi.herokuapp.com/api/customer";
    const firstName = document.getElementById(`fname`).value;
    const lastName = document.getElementById(`lname`).value;
    const birthdate = document.getElementById(`birthdate`).value;
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`password`).value;
    if(document.getElementById("subscribeToEmails").checked==true){
        var status="yes";
    }
    else{
        var status="no";
    }
    if (firstName == null || firstName == "" || lastName == null || lastName == "" || birthdate == null || birthdate == "" || email == null || email == "" || password == null || password == ""){
        if (document.getElementById("errorMsg").innerHTML=="You must fill out all information"){

        }
        else{
            var errorMessage = document.getElementById("errorMsg");
            var html = "You must fill out all information";
            errorMessage.innerHTML=html;
        }
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
                    birthdate: birthdate,
                    email: email,
                    password: password,
                    status: status
                })
            })
            .then((response)=>{
                console.log(response); 
                var user = {firstName, lastName, birthdate, email, password};
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.replace("../custCarousel/carousel.html");
            })
        }
        else{
            if (document.getElementById("errorMsg").innerHTML=="You must agree to the Terms and Conditions before registering your account."){

            }
            else{
                var errorMessage = document.getElementById("errorMsg");
                var html = "You must agree to the Terms and Conditions before registering your account.";
                errorMessage.innerHTML=html;
            }
        }
    }
}