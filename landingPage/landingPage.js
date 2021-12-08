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
        loginOnClick(json);
    }).catch(function(error){
        console.log(error);
    });
}

async function loginOnClick(json) {
    var emailval = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (emailval==json[0].email)
    {
        if (pass==json[0].password)
        {
            var user = json[0];
            sessionStorage.setItem('user', JSON.stringify(user));

            window.location.replace("../customer/custCarousel/carousel.html");
        }
        else{
            if (document.getElementById("errorMsg").innerHTML = "Incorrect email or password. Please try again"){

            }
            else{
                var html = "Incorrect email or password. Please try again";
                document.getElementById("errorMsg").innerHTML = html;
            }
        }
    }
    else{
        if (document.getElementById("errorMsg").innerHTML = "Incorrect email or password. Please try again"){

        }
        else{
            var html = "Incorrect email or password. Please try again";
            document.getElementById("errorMsg").innerHTML = html;
        }
    }
}