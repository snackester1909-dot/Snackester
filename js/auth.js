const BASE_URL = 'https://snackester-backend.onrender.com';

let currentUser = JSON.parse(localStorage.getItem('snackesterUser')) || null;

// --- UI Updates ---
function updateUserInterface() {
    if (currentUser) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('signupBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    } else {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('signupBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('snackesterUser');
    updateUserInterface();
    showMessage("Logged out successfully!", "green");
}

// --- Message Popup ---
function showMessage(message, color = "green") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `fixed top-4 right-4 bg-${color}-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 success-animation`;
    msgDiv.textContent = message;
    document.body.appendChild(msgDiv);

    setTimeout(() => {
        msgDiv.remove();
    }, 3000);
}

// --- Form Switch ---
function switchToSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
}

function switchToLogin() {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// --- Login Handler ---
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('snackesterUser', JSON.stringify(currentUser));
            updateUserInterface();
            showMessage(`Welcome back, ${currentUser.firstName}!`, "green");
            if (typeof closeAuthModal === "function") closeAuthModal();
        } else {
            showMessage(data.message || "Invalid credentials!", "red");
        }
    } catch (err) {
        console.error(err);
        showMessage("Something went wrong!", "red");
    }
});

// --- Signup Handler ---
document.getElementById('signupFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "red");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters!", "red");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, phone, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('snackesterUser', JSON.stringify(currentUser));
            updateUserInterface();
            showMessage(`Welcome to Snackester, ${currentUser.firstName}! 🎉`, "green");
            if (typeof closeAuthModal === "function") closeAuthModal();
        } else {
            showMessage(data.message || "Signup failed!", "red");
        }
    } catch (err) {
        console.error(err);
        showMessage("Something went wrong!", "red");
    }
});

// --- Initialize ---
updateUserInterface();
document.getElementById('switchToSignup').addEventListener('click', switchToSignup);
document.getElementById('switchToLogin').addEventListener('click', switchToLogin);
document.getElementById('logoutBtn').addEventListener('click', logout);
