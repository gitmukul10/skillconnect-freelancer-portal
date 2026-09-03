document.addEventListener("DOMContentLoaded", () => {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    initializeFreelancers();
});


let allFreelancers = [];


function initializeFreelancers() {

    seedFreelancers();

    allFreelancers = getData(
        STORAGE_KEYS.FREELANCERS,
        []
    );

    populateCategoryFilter();

    renderFreelancers(allFreelancers);

    setupFreelancerEvents();
}


function seedFreelancers() {

    const existingFreelancers =
        getData(STORAGE_KEYS.FREELANCERS, []);

    if (existingFreelancers.length > 0) {
        return;
    }

    const sampleFreelancers = [

        {
            id: 1,
            name: "Jessica Davis",
            category: "UI/UX Design",
            skills: "Figma, UI Design, Prototyping",
            rate: 45,
            rating: 4.9
        },

        {
            id: 2,
            name: "Michael Chen",
            category: "Web Development",
            skills: "React, JavaScript, Node.js",
            rate: 55,
            rating: 4.8
        },

        {
            id: 3,
            name: "Sarah Johnson",
            category: "Digital Marketing",
            skills: "SEO, Content Strategy, Analytics",
            rate: 40,
            rating: 4.7
        },

        {
            id: 4,
            name: "David Wilson",
            category: "Mobile Development",
            skills: "Flutter, Android, iOS",
            rate: 60,
            rating: 4.9
        },

        {
            id: 5,
            name: "Priya Sharma",
            category: "Data Science",
            skills: "Python, Machine Learning, Pandas",
            rate: 65,
            rating: 4.8
        },

        {
            id: 6,
            name: "Alex Morgan",
            category: "Web Development",
            skills: "HTML, CSS, JavaScript, React",
            rate: 50,
            rating: 4.6
        }
    ];

    saveData(
        STORAGE_KEYS.FREELANCERS,
        sampleFreelancers
    );
}


function populateCategoryFilter() {

    const categoryFilter =
        document.getElementById("categoryFilter");

    const categories = [
        ...new Set(
            allFreelancers.map(
                freelancer => freelancer.category
            )
        )
    ];

    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


function setupFreelancerEvents() {

    const searchInput =
        document.getElementById("freelancerSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const addButton =
        document.getElementById(
            "addFreelancerButton"
        );

    const form =
        document.getElementById("freelancerForm");

    const closeButton =
        document.getElementById(
            "closeModalButton"
        );

    const cancelButton =
        document.getElementById(
            "cancelModalButton"
        );

    searchInput.addEventListener(
        "input",
        filterFreelancers
    );

    categoryFilter.addEventListener(
        "change",
        filterFreelancers
    );

    addButton.addEventListener(
        "click",
        () => openFreelancerModal()
    );

    form.addEventListener(
        "submit",
        handleFreelancerSubmit
    );

    closeButton.addEventListener(
        "click",
        closeFreelancerModal
    );

    cancelButton.addEventListener(
        "click",
        closeFreelancerModal
    );

    document.addEventListener(
        "click",
        event => {

            if (
                event.target.hasAttribute(
                    "data-close-modal"
                )
            ) {
                closeFreelancerModal();
            }

            const editButton =
                event.target.closest(
                    "[data-edit-id]"
                );

            const deleteButton =
                event.target.closest(
                    "[data-delete-id]"
                );

            const bookButton =
                event.target.closest(
                    "[data-book-id]"
                );

            if (editButton) {

                editFreelancer(
                    Number(
                        editButton.dataset.editId
                    )
                );
            }

            if (deleteButton) {

                deleteFreelancer(
                    Number(
                        deleteButton.dataset.deleteId
                    )
                );
            }

            if (bookButton) {

                bookFreelancer(
                    Number(
                        bookButton.dataset.bookId
                    )
                );
            }
        }
    );
}


function filterFreelancers() {

    const searchTerm =
        document
            .getElementById("freelancerSearch")
            .value
            .trim()
            .toLowerCase();

    const selectedCategory =
        document
            .getElementById("categoryFilter")
            .value;

    const filteredFreelancers =
        allFreelancers.filter(
            freelancer => {

                const matchesSearch =
                    freelancer.name
                        .toLowerCase()
                        .includes(searchTerm) ||

                    freelancer.skills
                        .toLowerCase()
                        .includes(searchTerm);

                const matchesCategory =
                    selectedCategory === "all" ||
                    freelancer.category ===
                    selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        );

    renderFreelancers(
        filteredFreelancers
    );
}


function renderFreelancers(freelancers) {

    const grid =
        document.getElementById("freelancerGrid");

    const resultsInfo =
        document.getElementById("resultsInfo");

    resultsInfo.textContent =
        `${freelancers.length} freelancer${
            freelancers.length === 1 ? "" : "s"
        } found`;

    if (!freelancers.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <p>
                    No freelancers found matching your search.
                </p>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        freelancers
            .map(
                freelancer => {

                    const initials =
                        freelancer.name
                            .split(" ")
                            .map(
                                name =>
                                    name.charAt(0)
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase();

                    return `
                        <article class="freelancer-card">

                            <div
                                class="freelancer-card-top"
                            >

                                <div
                                    class="freelancer-avatar"
                                >
                                    ${initials}
                                </div>

                                <span
                                    class="rating-badge"
                                >
                                    ★ ${freelancer.rating}
                                </span>

                            </div>


                            <h2>
                                ${freelancer.name}
                            </h2>

                            <p
                                class="freelancer-category"
                            >
                                ${freelancer.category}
                            </p>

                            <p
                                class="freelancer-skills"
                            >
                                ${freelancer.skills}
                            </p>

                            <p
                                class="freelancer-rate"
                            >
                                $${freelancer.rate}
                                <span>
                                    / hour
                                </span>
                            </p>


                            <div
                                class="freelancer-actions"
                            >

                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-book-id="${freelancer.id}"
                                >
                                    Book
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-outline"
                                    data-edit-id="${freelancer.id}"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    data-delete-id="${freelancer.id}"
                                >
                                    Delete
                                </button>

                            </div>

                        </article>
                    `;
                }
            )
            .join("");
}


function openFreelancerModal(
    freelancer = null
) {

    const modal =
        document.getElementById(
            "freelancerModal"
        );

    const form =
        document.getElementById(
            "freelancerForm"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );

    form.reset();

    document.getElementById(
        "freelancerMessage"
    ).textContent = "";

    if (freelancer) {

        title.textContent =
            "Edit Freelancer";

        document.getElementById(
            "freelancerId"
        ).value = freelancer.id;

        document.getElementById(
            "freelancerName"
        ).value = freelancer.name;

        document.getElementById(
            "freelancerCategory"
        ).value = freelancer.category;

        document.getElementById(
            "freelancerSkills"
        ).value = freelancer.skills;

        document.getElementById(
            "freelancerRate"
        ).value = freelancer.rate;

        document.getElementById(
            "freelancerRating"
        ).value = freelancer.rating;

    } else {

        title.textContent =
            "Add Freelancer";

        document.getElementById(
            "freelancerId"
        ).value = "";
    }

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeFreelancerModal() {

    const modal =
        document.getElementById(
            "freelancerModal"
        );

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


function handleFreelancerSubmit(event) {

    event.preventDefault();

    const id =
        document.getElementById(
            "freelancerId"
        ).value;

    const name =
        document.getElementById(
            "freelancerName"
        ).value
        .trim();

    const category =
        document.getElementById(
            "freelancerCategory"
        ).value;

    const skills =
        document.getElementById(
            "freelancerSkills"
        ).value
        .trim();

    const rate =
        Number(
            document.getElementById(
                "freelancerRate"
            ).value
        );

    const rating =
        Number(
            document.getElementById(
                "freelancerRating"
            ).value
        );

    const message =
        document.getElementById(
            "freelancerMessage"
        );

    if (
        !name ||
        !category ||
        !skills ||
        !rate ||
        !rating
    ) {

        showMessage(
            message,
            "Please complete all fields.",
            "error"
        );

        return;
    }

    if (
        rating < 1 ||
        rating > 5
    ) {

        showMessage(
            message,
            "Rating must be between 1 and 5.",
            "error"
        );

        return;
    }

    if (id) {

        const freelancerIndex =
            allFreelancers.findIndex(
                freelancer =>
                    freelancer.id === Number(id)
            );

        allFreelancers[
            freelancerIndex
        ] = {
            ...allFreelancers[
                freelancerIndex
            ],

            name,
            category,
            skills,
            rate,
            rating
        };

    } else {

        const newFreelancer = {

            id: Date.now(),

            name,
            category,
            skills,
            rate,
            rating
        };

        allFreelancers.push(
            newFreelancer
        );
    }

    saveData(
        STORAGE_KEYS.FREELANCERS,
        allFreelancers
    );

    populateCategoryFilter();

    renderFreelancers(
        allFreelancers
    );

    closeFreelancerModal();
}


function editFreelancer(id) {

    const freelancer =
        allFreelancers.find(
            freelancer =>
                freelancer.id === id
        );

    if (!freelancer) {
        return;
    }

    openFreelancerModal(
        freelancer
    );
}


function deleteFreelancer(id) {

    const freelancer =
        allFreelancers.find(
            freelancer =>
                freelancer.id === id
        );

    if (!freelancer) {
        return;
    }

    const confirmed =
        window.confirm(
            `Delete ${freelancer.name}?`
        );

    if (!confirmed) {
        return;
    }

    allFreelancers =
        allFreelancers.filter(
            freelancer =>
                freelancer.id !== id
        );

    saveData(
        STORAGE_KEYS.FREELANCERS,
        allFreelancers
    );

    populateCategoryFilter();

    renderFreelancers(
        allFreelancers
    );
}


function bookFreelancer(id) {

    window.location.href =
        `bookings.html?freelancer=${id}`;
}