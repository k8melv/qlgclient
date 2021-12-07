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

                window.location.replace("../customer/custCarousel/carousel.html");
            }
        }
    }
    catch{
        var html = "<input type='password' id='pass' name='password' placeholder='Password'><br><br><div style='color: red'>Incorrect email or password. Try again</div>";
        document.getElementById("pass").outerHTML = html
    }
}