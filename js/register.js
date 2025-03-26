document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                gender,
                password,
                dob,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.error || "Error signing up");
            return;
        }

        alert("Sign Up Successful! Redirecting to login...");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during sign up.");
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.error || "Error logging in");
            return;
        }

        alert("Login Successful!");
        // Redirect to a protected page or dashboard
        window.location.href = "dashboard.html"; // Change this to your desired page
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login.");
    }
});