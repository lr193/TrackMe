// const devices = [];

// devices.push({ user: "Mary", name: "Mary's iPhone" });
// devices.push({ user: "Alex", name: "Alex's Surface Pro" });
// devices.push({ user: "Mary", name: "Mary's MacBook" });

$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];

const users = JSON.parse(localStorage.getItem('users')) || [];

devices.forEach(function(device){
    $('#devices tbody').append(`
        <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
        </tr>`
    );
});

const logout = () => {  
    
    localStorage.removeItem('isAuthenticated');  
    location.href = '/login';
}

$('#login').on('click', function(){

    // const isAuthenticated;
    const username = $('#user').val();
    const pwd = $('#password').val();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find(user => user.user === username);

    if(exists === undefined){
        //User does not exists

        $(document).ready(function(){
            $('#message').append("<p class='alert alert-danger'>Please re-enter the credentials</p>");
        });
    }
    else{
        if(pwd === exists.password){
            //Two passwords match
            //Login
            console.log("Passwords Match")
            
            const isAuthenticated = undefined;
            localStorage.setItem('isAuthenticated', "true");

            location.href = '/';
         
        }else{
            //User found , but the password does not match
            console.log("password does not match");

            $(document).ready(function(){
                $('#message').append("<p class='alert alert-danger'>Please re-enter the password</p>");
            });
           
        }

    }
});

$('#register').on('click', function(){
    
    const username = $('#user').val();
    const pwd = $('#password').val();
    const cpwd = $('#confirmPassword').val();

    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find(user => user.user === username);

    console.log(exists);
    console.log(username);
    console.log(pwd);

    if(exists === undefined){
        //Register User

        if(pwd === cpwd){
            //Two passwords match
            users.push({user: username, password: pwd});
            localStorage.setItem('users', JSON.stringify(users));
            
            location.href = '/';

            $(document).ready(function(){
                $('#message').append("<p class='alert alert-success'>User added! </p>");
            });
         
        }else{
            //passwords do not match
            $(document).ready(function(){
                $('#message').append("<p class='alert alert-danger'>The passwords should match </p>");
            });
            
        }    

    }else{
        //User exists
        $(document).ready(function(){
            $('#message').append("<p class='alert alert-danger'>This username already exists! </p>");
        });

    }
        
});

$('#add-device').on('click', function() {
    const user = $('#user').val();
    const name = $('#name').val();
    // devices.push({ user: user, name: name });
    devices.push({ user, name });
    localStorage.setItem('devices', JSON.stringify(devices));
    // console.log(devices);
    // location.href = 'device-list.html';
    location.href = '/';
});

$('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

