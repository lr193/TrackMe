// const devices = [];

// devices.push({ user: "Mary", name: "Mary's iPhone" });
// devices.push({ user: "Alex", name: "Alex's Surface Pro" });
// devices.push({ user: "Mary", name: "Mary's MacBook" });

$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://sit209.vercel.app';


const currentUser = localStorage.getItem('user');

if (currentUser) {  
    console.log("Inside current");

    $.get(`${API_URL}/users/${currentUser}/devices`)  
    .then(response => {    
        
    console.log("Current: "+currentUser);
        response.forEach((device) => {  
            console.log("Inside response");           
            $('#devices tbody').append(`
            <tr data-device-id=${device._id}> 
            <td>${device.user}</td>
            <td>${device.name}</td>        
            </tr>`      
            );    
        });
        console.log("After device! ");
        $('#devices tbody tr').on('click' , (e) => {
            console.log("Clicked");
            const deviceId = e.currentTarget.getAttribute('data-device-id');
            $.get(`${API_URL}/devices/${deviceId}/device-history`)
            .then(response => {                
                response.map(sensorData => {
                    console.log(sensorData);
                    $('#historyContent').append(`
                        <tr>
                        <td>${sensorData.ts}</td>
                        <td>${sensorData.temp}</td>
                        <td>${sensorData.loc.lat}</td>
                        <td>${sensorData.loc.lon}</td>
                        </tr>
                        `);
                });
                $('#historyModal').modal('show'); 
            });
        });  
    })  
    .catch(error => {    
        console.error(`Error: ${error}`);  
    });
}
else 
{
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/registration') 
    {    
        location.href = '/login';  
    }
}



// const devices = JSON.parse(localStorage.getItem('devices')) || [];

// $.get(`${API_URL}/devices`)
//     .then(response => {
//         response.forEach(device => {
//             $('#devices tbody').append(
//             `
//             <tr>        
//                 <td>${device.user}</td>
//                 <td>${device.name}</td>  
//             </tr>
//             `
//             );
//     }); 
// }).catch(error => {
//         console.error("Error: ${error}");
// });

// const users = JSON.parse(localStorage.getItem('users')) || [];

// devices.forEach(function(device){
//     $('#devices tbody').append(`
//         <tr>
//             <td>${device.user}</td>
//             <td>${device.name}</td>
//         </tr>`
//     );
// });

const logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
}

$('#login').on('click', () => {
    const name = $('#user').val();
    const password = $('#password').val();  

    console.log(name);
    console.log(password);
    
    $.post(`${API_URL}/authenticate`, { name, password })  
    .then((response) =>{    
        if (response.success) {      
            localStorage.setItem('user', name);      
            localStorage.setItem('isAdmin', response.isAdmin);      
            localStorage.setItem('isAuthenticated', true);
            console.log("AUthenticated");      
            location.href = '/';    
        }
        else{      
            $('#message').append(`<p class="alert alert-danger">${response}</p>`);    
        } 
    
    });

});

$('#register').on('click', function () {

    const username = $('#user').val();
    const pwd = $('#password').val();
    const cpwd = $('#confirmPassword').val();

    console.log("username:"+username);
    console.log("password:"+pwd);

    if (pwd === cpwd){
        const isAdmin = 1;
        console.log("passwords match");
        
        $.post(`${API_URL}/registration`,{username,pwd,isAdmin})
        .then(response => {
            
            if(response.success == true ){
                console.log("inside response == success");
                location.href = '/login';
            }
            else if(response.success == false){
                console.log("inside response =! success");
                $('#message').append("<p class='alert alert-secondary'>The user already exists </p>");     
            }
            else{
                console.log("inside response =! success");
                $('#message').append("<p class='alert alert-secondary'>Please try again! </p>");
            }
         }).catch(error => {
                console.error("Error: ${error}");
                $('#message').append("<p class='alert alert-success'>Error in response</p>");     
         });
    } 
    else {
        //passwords do not match
        console.log("passwords do not match");
        $(document).ready(function () {
            $('#message').append("<p class='alert alert-danger'>The passwords should match! </p>");
        });

    }
});

$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [ {
        ts : "075023753",
        temp: 14
    }];
    
    const body = {
            name,
            user,    
            sensorData  
    }; 

    $.post(`${API_URL}//users/:user/devices`,{name,user,sensorData})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Error: ${error}");
    });
    
        
        // "sensorData": [
        //     {
        //     "ts": "1529542743",
        //     "temp": 14,
        //     "loc": {
        //     "lat": 33.812092,
        //     "lon": -117.918974
        //     }
        //     }
        //     ]

        // $.post('http://localhost:3000/devices', body)  
        // .then(response => {
        //     location.href = '/';  
        // })  
        // .catch(error => {
        //     console.error(`Error: ${error}`);  
        // });
    });

$('#send-command').on('click', function () {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});


// $('#add-device').on('click', function () { //first add device 
//     const user = $('#user').val();
//     const name = $('#name').val();
//     // devices.push({ user: user, name: name });
//     devices.push({ user, name });
//     localStorage.setItem('devices', JSON.stringify(devices));
//     // console.log(devices);
//     // location.href = 'device-list.html';
//     location.href = '/';
// });



// $('#login').on('click', function () { //First login function

//     // const isAuthenticated;
//     const username = $('#user').val();
//     const pwd = $('#password').val();

//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     const exists = users.find(user => user.user === username);

//     if (exists === undefined) {
//         //User does not exists

//         $(document).ready(function () {
//             $('#message').append("<p class='alert alert-danger'>Please re-enter the credentials</p>");
//         });
//     }
//     else {
//         if (pwd === exists.password) {
//             //Two passwords match
//             //Login
//             console.log("Passwords Match")

//             const isAuthenticated = undefined;
//             localStorage.setItem('isAuthenticated', "true");

//             location.href = '/';

//         } else {
//             //User found , but the password does not match
//             console.log("password does not match");

//             $(document).ready(function () {
//                 $('#message').append("<p class='alert alert-danger'>Please re-enter the password</p>");
//             });

//         }

//     }
// });
