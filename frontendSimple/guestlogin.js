// login.js

function login() {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username and password from the form
    var enteredUsername = document.getElementById('username').value;
    var enteredPassword = document.getElementById('password').value;

    // Define multiple usernames with their corresponding passwords
    var credentials = {
        'ct_chairman': 'ctu@123',
        'ct_md': 'ctu@123',
        'ct_vc': 'ctu@123',
        'ct_dean': 'ctu@123',
        'ct_registrar': 'ctu@123'
    };

    // Check if entered credentials match any in the list
    if (credentials.hasOwnProperty(enteredUsername) && enteredPassword === credentials[enteredUsername]) {
        // Redirect the user to the desired page after successful login
        window.location.href = 'calender.html';
    } else {
        // Handle failed login, show an error message, etc.
        alert('Login failed. Please check your username and password.');
        
        // Clear the input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}
