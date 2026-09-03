document.addEventListener("DOMContentLoaded", () => {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").textContent =
        currentUser.name.split(" ")[0];

    initializeDashboard();
});


function initializeDashboard() {

    const freelancers = getData(
        STORAGE_KEYS.FREELANCERS,
        []
    );

    const bookings = getData(
        STORAGE_KEYS.BOOKINGS,
        []
    );

    updateDashboardStats(freelancers, bookings);

    renderRecentBookings(bookings);

    createBookingStatusChart(bookings);

    createCategoryChart(freelancers);
}


function updateDashboardStats(freelancers, bookings) {

    const activeBookings = bookings.filter(
        booking => booking.status === "active"
    );

    const completedBookings = bookings.filter(
        booking => booking.status === "completed"
    );

    const categories = [
        ...new Set(
            freelancers.map(
                freelancer => freelancer.category
            )
        )
    ];

    document.getElementById("totalFreelancers").textContent =
        freelancers.length;

    document.getElementById("activeBookings").textContent =
        activeBookings.length;

    document.getElementById("completedBookings").textContent =
        completedBookings.length;

    document.getElementById("totalCategories").textContent =
        freelancers.length ? categories.length : 0;
}


function renderRecentBookings(bookings) {

    const container =
        document.getElementById(
            "recentBookings"
        );

    if (!bookings.length) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>
                    No bookings yet
                </h3>

                <p>
                    Start your first project by browsing
                    talented freelancers.
                </p>

                <a href="freelancers.html">
                    Find Freelancers →
                </a>
            </div>
        `;

        return;
    }


    const recentBookings =
        [...bookings]
            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt
                    ) -
                    new Date(
                        a.createdAt
                    )
            )
            .slice(0, 5);


    container.innerHTML =
        recentBookings
            .map(
                booking => `

                    <article
                        class="recent-booking-card"
                    >

                        <div>

                            <h3>
                                ${booking.projectTitle}
                            </h3>

                            <p>
                                ${booking.freelancerName}
                            </p>

                        </div>


                        <span
                            class="booking-status ${booking.status}"
                        >
                            ${booking.status}
                        </span>

                    </article>

                `
            )
            .join("");
}

function createBookingStatusChart(bookings) {

    const canvas =
        document.getElementById("bookingStatusChart");

    if (!canvas) {
        return;
    }

    const active =
        bookings.filter(
            booking => booking.status === "active"
        ).length;

    const completed =
        bookings.filter(
            booking => booking.status === "completed"
        ).length;

    const pending =
        bookings.filter(
            booking => booking.status === "pending"
        ).length;

    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [
                "Active",
                "Completed",
                "Pending"
            ],

            datasets: [
                {
                    data: [
                        active,
                        completed,
                        pending
                    ],

                    backgroundColor: [
                        "#5b5bd6",
                        "#20a56b",
                        "#f4b740"
                    ]
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}


function createCategoryChart(freelancers) {

    const canvas =
        document.getElementById("categoryChart");

    if (!canvas) {
        return;
    }

    const categoryCounts = {};

    freelancers.forEach(freelancer => {

        const category =
            freelancer.category || "Other";

        categoryCounts[category] =
            (categoryCounts[category] || 0) + 1;
    });

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: Object.keys(categoryCounts),

            datasets: [
                {
                    label: "Freelancers",

                    data:
                        Object.values(categoryCounts),

                    backgroundColor:
                        "#5b5bd6"
                }
            ]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}