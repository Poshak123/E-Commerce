document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.textContent = '';
    });

    // Username validation
    const username = document.getElementById('username').value;
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Confirm Password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Phone Number validation (basic 10-digit check)
    const phone = document.getElementById('phone').value;
    if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';
        isValid = false;
    }

    // Address validation
    const address = document.getElementById('address').value;
    if (address.trim() === '') {
        document.getElementById('addressError').textContent = 'Address cannot be empty.';
        isValid = false;
    }

    if (isValid) {
        alert('Registration successful! Redirecting to home page.');
        // Optionally reset the form here if needed:
        // document.getElementById('registrationForm').reset();

        // Redirect after alert
        window.location.href = 'home.html'; // safer way to redirect
    }
});
