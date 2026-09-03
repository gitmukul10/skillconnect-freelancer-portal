document.addEventListener("DOMContentLoaded", () => {

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                clearCurrentUser();

                window.location.href =
                    "index.html";
            }
        );
    }
});