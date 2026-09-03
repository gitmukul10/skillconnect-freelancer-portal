document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    redirectLoggedInUsers();
});


function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value
        .trim()
        .toLowerCase();

    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");

    clearMessage(message);

    if (name.length < 2) {
        showMessage(message, "Please enter a valid name.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(message, "Please enter a valid email address.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage(
            message,
            "Password must contain at least 6 characters.",
            "error"
        );
        return;
    }

    if (password !== confirmPassword) {
        showMessage(message, "Passwords do not match.", "error");
        return;
    }

    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        showMessage(
            message,
            "An account with this email already exists.",
            "error"
        );
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUsers(users);

    setCurrentUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    });

    showMessage(
        message,
        "Account created successfully! Redirecting...",
        "success"
    );

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
}


function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    clearMessage(message);

    if (!isValidEmail(email)) {
        showMessage(message, "Please enter a valid email address.", "error");
        return;
    }

    if (!password) {
        showMessage(message, "Please enter your password.", "error");
        return;
    }

    const users = getUsers();

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        showMessage(
            message,
            "Invalid email or password.",
            "error"
        );
        return;
    }

    setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email
    });

    showMessage(
        message,
        "Login successful! Redirecting...",
        "success"
    );

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 700);
}


function redirectLoggedInUsers() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    const currentPage = window.location.pathname.split("/").pop();

    if (
        currentPage === "login.html" ||
        currentPage === "register.html"
    ) {
        window.location.href = "dashboard.html";
    }
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `form-message ${type}`;
}


function clearMessage(element) {
    element.textContent = "";
    element.className = "form-message";
}