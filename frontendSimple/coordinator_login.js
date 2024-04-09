// login.js

function login() {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username and password from the form
    var enteredUsername = document.getElementById('Username').value;
    var enteredPassword = document.getElementById('Password').value;

    // Define multiple usernames with their corresponding passwords
    var credentials = {
        'ct_maqsudan': 'ctu@123',
        'ct_shahpur': 'ctu@123',
        'ct_worldschool': 'ctu@123',
        'ct_publicschool': 'ctu@123',
        'ct_law': 'ctu@123',
        'ct_pharmacy': 'ctu@123',
        'ct_healthsciences': 'ctu@123',
        'ct_alliedhealthsciences': 'ctu@123',
        'ct_optometry': 'ctu@123',
        'ct_mgmt': 'ctu@123',
        'ct_arts': 'ctu@123',
        'ct_collegiate': 'ctu@123',
    };

    // Check if entered credentials match any in the list
    if (credentials.hasOwnProperty(enteredUsername) && enteredPassword === credentials[enteredUsername]) {
        // Redirect the user to the desired page after successful login
        window.location.href = 'event_req_res.html';
    } else {
        // Handle failed login, show an error message, etc.
        alert('Login failed. Please check your username and password.');
        
        // Clear the input fields
        document.getElementById('Username').value = '';
        document.getElementById('Password').value = '';
    }
}
