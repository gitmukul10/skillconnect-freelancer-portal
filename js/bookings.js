document.addEventListener("DOMContentLoaded", () => {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    initializeBookings();
});


let freelancers = [];
let bookings = [];


function initializeBookings() {

    freelancers = getData(
        STORAGE_KEYS.FREELANCERS,
        []
    );

    bookings = getData(
        STORAGE_KEYS.BOOKINGS,
        []
    );

    populateFreelancerSelect();

    preselectFreelancerFromURL();

    renderBookings();

    setupBookingEvents();

    setMinimumStartDate();
}


function populateFreelancerSelect() {

    const select =
        document.getElementById(
            "bookingFreelancer"
        );

    freelancers.forEach(freelancer => {

        const option =
            document.createElement("option");

        option.value = freelancer.id;

        option.textContent =
            `${freelancer.name} — ${freelancer.category}`;

        select.appendChild(option);
    });
}


function preselectFreelancerFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const freelancerId =
        params.get("freelancer");

    if (!freelancerId) {
        return;
    }

    const select =
        document.getElementById(
            "bookingFreelancer"
        );

    const exists =
        freelancers.some(
            freelancer =>
                freelancer.id ===
                Number(freelancerId)
        );

    if (exists) {
        select.value = freelancerId;
    }
}


function setMinimumStartDate() {

    const dateInput =
        document.getElementById(
            "projectStartDate"
        );

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;
}


function setupBookingEvents() {

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );

    bookingForm.addEventListener(
        "submit",
        handleBookingSubmit
    );

    document.addEventListener(
        "change",
        event => {

            if (
                event.target.matches(
                    "[data-booking-status]"
                )
            ) {

                updateBookingStatus(
                    Number(
                        event.target.dataset
                            .bookingStatus
                    ),
                    event.target.value
                );
            }
        }
    );

    document.addEventListener(
        "click",
        event => {

            const deleteButton =
                event.target.closest(
                    "[data-delete-booking]"
                );

            if (deleteButton) {

                deleteBooking(
                    Number(
                        deleteButton.dataset
                            .deleteBooking
                    )
                );
            }
        }
    );
}


function handleBookingSubmit(event) {

    event.preventDefault();

    const freelancerId =
        Number(
            document.getElementById(
                "bookingFreelancer"
            ).value
        );

    const projectTitle =
        document.getElementById(
            "projectTitle"
        ).value
        .trim();

    const startDate =
        document.getElementById(
            "projectStartDate"
        ).value;

    const budget =
        Number(
            document.getElementById(
                "projectBudget"
            ).value
        );

    const description =
        document.getElementById(
            "projectDescription"
        ).value
        .trim();

    const message =
        document.getElementById(
            "bookingMessage"
        );

    clearMessage(message);

    if (
        !freelancerId ||
        !projectTitle ||
        !startDate ||
        !budget ||
        !description
    ) {

        showMessage(
            message,
            "Please complete all fields.",
            "error"
        );

        return;
    }

    const selectedFreelancer =
        freelancers.find(
            freelancer =>
                freelancer.id ===
                freelancerId
        );

    if (!selectedFreelancer) {

        showMessage(
            message,
            "Please select a valid freelancer.",
            "error"
        );

        return;
    }

    const newBooking = {

        id: Date.now(),

        freelancerId:
            selectedFreelancer.id,

        freelancerName:
            selectedFreelancer.name,

        freelancerCategory:
            selectedFreelancer.category,

        projectTitle,

        description,

        startDate,

        budget,

        status: "pending",

        createdAt:
            new Date().toISOString()
    };

    bookings.push(
        newBooking
    );

    saveData(
        STORAGE_KEYS.BOOKINGS,
        bookings
    );

    showMessage(
        message,
        "Booking created successfully!",
        "success"
    );

    document
        .getElementById(
            "bookingForm"
        )
        .reset();

    renderBookings();
}


function renderBookings() {

    const container =
        document.getElementById(
            "bookingsList"
        );

    if (!bookings.length) {

        container.innerHTML = `
            <div class="empty-state">
                <p>
                    You don't have any bookings yet.
                </p>
            </div>
        `;

        return;
    }

    const sortedBookings =
        [...bookings].sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );

    container.innerHTML =
        sortedBookings
            .map(
                booking => `

                    <article
                        class="booking-card"
                    >

                        <div>

                            <span
                                class="booking-status ${booking.status}"
                            >
                                ${booking.status}
                            </span>

                            <h3>
                                ${booking.projectTitle}
                            </h3>

                            <p
                                class="booking-freelancer"
                            >
                                ${booking.freelancerName}
                            </p>

                            <p
                                class="booking-description"
                            >
                                ${booking.description}
                            </p>

                            <div
                                class="booking-meta"
                            >

                                <span>
                                    📅 ${formatDate(
                                        booking.startDate
                                    )}
                                </span>

                                <span>
                                    💰 $${booking.budget}
                                </span>

                                <span>
                                    🧩 ${booking.freelancerCategory}
                                </span>

                            </div>

                        </div>


                        <div
                            class="booking-actions"
                        >

                            <label
                                class="visually-hidden"
                                for="status-${booking.id}"
                            >
                                Update booking status
                            </label>

                            <select
                                id="status-${booking.id}"
                                data-booking-status="${booking.id}"
                            >

                                <option
                                    value="pending"
                                    ${
                                        booking.status ===
                                        "pending"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Pending
                                </option>

                                <option
                                    value="active"
                                    ${
                                        booking.status ===
                                        "active"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Active
                                </option>

                                <option
                                    value="completed"
                                    ${
                                        booking.status ===
                                        "completed"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Completed
                                </option>

                            </select>


                            <button
                                type="button"
                                class="btn btn-danger"
                                data-delete-booking="${booking.id}"
                            >
                                Cancel Booking
                            </button>

                        </div>

                    </article>

                `
            )
            .join("");
}


function updateBookingStatus(
    id,
    status
) {

    const booking =
        bookings.find(
            booking =>
                booking.id === id
        );

    if (!booking) {
        return;
    }

    booking.status = status;

    saveData(
        STORAGE_KEYS.BOOKINGS,
        bookings
    );

    renderBookings();
}


function deleteBooking(id) {

    const booking =
        bookings.find(
            booking =>
                booking.id === id
        );

    if (!booking) {
        return;
    }

    const confirmed =
        window.confirm(
            `Cancel "${booking.projectTitle}"?`
        );

    if (!confirmed) {
        return;
    }

    bookings =
        bookings.filter(
            booking =>
                booking.id !== id
        );

    saveData(
        STORAGE_KEYS.BOOKINGS,
        bookings
    );

    renderBookings();
}


function formatDate(dateString) {

    return new Date(
        `${dateString}T00:00:00`
    ).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}