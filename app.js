// const devices = [];

// devices.push({ user: "Mary", name: "Mary's iPhone" });
// devices.push({ user: "Alex", name: "Alex's Surface Pro" });
// devices.push({ user: "Mary", name: "Mary's MacBook" });

const devices = JSON.parse(localStorage.getItem('devices')) || [];

devices.forEach(function(device) {
    $('#devices tbody').append(`
        <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
        </tr>`
    );
});

$('#add-device').on('click', function() {
    const user = $('#user').val();
    const name = $('#name').val();
    // devices.push({ user: user, name: name });
    devices.push({ user, name });
    localStorage.setItem('devices', JSON.stringify(devices));
    // console.log(devices);
    location.href = 'device-list.html';
});

$('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});


// document.querySelector('#add-device').addEventListener('click',
// function() {
//     const user = document.querySelector('#user').value;
//     const name = document.querySelector('#name').value;
//     devices.push({ user: user, name: name });
//     console.log(devices);
// });

// devices.forEach(function(device) {
//     const table = document.querySelector('#devices');
//     const row = document.createElement('tr');
//     const user = document.createElement('td');
//     const userText = document.createTextNode(device.user);
//     user.appendChild(userText);
//     const name = document.createElement('td');
//     const nameText = document.createTextNode(device.name);
//     name.appendChild(nameText);
//     row.appendChild(user);
//     row.appendChild(name);
//     table.appendChild(row);
//     });