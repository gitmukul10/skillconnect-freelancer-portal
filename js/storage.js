const STORAGE_KEYS = {
    USERS: "skillconnect_users",
    CURRENT_USER: "skillconnect_current_user",
    FREELANCERS: "skillconnect_freelancers",
    BOOKINGS: "skillconnect_bookings"
};

function getData(key, fallback = []) {
    const data = localStorage.getItem(key);

    if (!data) {
        return fallback;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading localStorage:", error);
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getUsers() {
    return getData(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
    saveData(STORAGE_KEYS.USERS, users);
}

function getCurrentUser() {
    return getData(STORAGE_KEYS.CURRENT_USER, null);
}

function setCurrentUser(user) {
    saveData(STORAGE_KEYS.CURRENT_USER, user);
}

function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}