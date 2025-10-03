document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // In a real application, you would send the form data to a server for authentication.
    // For this example, we are simply redirecting.

    // Simulate a successful login and redirect to the home page
    window.location.href = 'home.html'; // Change 'home.html' to your actual home page URL
});