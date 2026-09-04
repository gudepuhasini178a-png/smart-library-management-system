/* =========================================================
   SMART LIBRARY MANAGEMENT SYSTEM
   JavaScript
   ========================================================= */


/* =========================================================
   LOGIN ELEMENTS
   ========================================================= */

const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");


/* =========================================================
   USER ELEMENTS
   ========================================================= */

const displayUsername =
    document.getElementById("displayUsername");

const displayRole =
    document.getElementById("displayRole");


/* =========================================================
   SEPARATE LOGIN CREDENTIALS
   ========================================================= */

const users = {

    Administrator: {
        username: "admin",
        password: "admin123"
    },

    Librarian: {
        username: "librarian",
        password: "lib123"
    },

    Student: {
        username: "student",
        password: "stu123"
    }

};


/* =========================================================
   PAGE NAVIGATION ELEMENTS
   ========================================================= */

const navButtons =
    document.querySelectorAll(".nav-button");

const contentPages =
    document.querySelectorAll(".content-page");

const pageTitle =
    document.getElementById("pageTitle");

const pageDescription =
    document.getElementById("pageDescription");


/* =========================================================
   PAGE INFORMATION
   ========================================================= */

const pageInformation = {

    dashboard: {
        title: "Dashboard",
        description: "Overview of your library"
    },

    books: {
        title: "Book Management",
        description: "Manage and search books in the library"
    },

    students: {
        title: "Student Management",
        description: "Manage registered students"
    },

    transactions: {
        title: "Issue & Return",
        description: "Manage book issue and return"
    },

    reservations: {
        title: "Reservations",
        description: "Manage reserved books"
    },

    fines: {
        title: "Fine Management",
        description: "Track overdue books and fines"
    },

    notifications: {
        title: "Notifications",
        description: "Important library notifications"
    },

    reports: {
        title: "Reports",
        description: "View library performance"
    },

    settings: {
        title: "Settings",
        description: "Manage system settings"
    }

};


/* =========================================================
   ROLE BASED ACCESS CONTROL
   ========================================================= */

function applyRolePermissions(role) {

    /* -----------------------------------------
       ADMINISTRATOR
       Full access
       ----------------------------------------- */

    const adminPages = [

        "dashboard",
        "books",
        "students",
        "transactions",
        "reservations",
        "fines",
        "notifications",
        "reports",
        "settings"

    ];


    /* -----------------------------------------
       LIBRARIAN
       Library operation access
       ----------------------------------------- */

    const librarianPages = [

        "dashboard",
        "books",
        "students",
        "transactions",
        "reservations",
        "fines",
        "notifications",
        "reports"

    ];


    /* -----------------------------------------
       STUDENT
       Student-only access
       ----------------------------------------- */

    const studentPages = [

        "dashboard",
        "books",
        "reservations",
        "notifications"

    ];


    /* -----------------------------------------
       Select allowed pages
       ----------------------------------------- */

    let allowedPages = [];


    if (role === "Administrator") {

        allowedPages = adminPages;

    }

    else if (role === "Librarian") {

        allowedPages = librarianPages;

    }

    else if (role === "Student") {

        allowedPages = studentPages;

    }


    /* -----------------------------------------
       Show / Hide Sidebar Buttons
       ----------------------------------------- */

    navButtons.forEach(function (button) {

        const pageName =
            button.dataset.page;


        if (allowedPages.includes(pageName)) {

            button.style.display = "";

        }

        else {

            button.style.display = "none";

        }

    });


    /* -----------------------------------------
       Remove active state
       ----------------------------------------- */

    navButtons.forEach(function (button) {

        button.classList.remove("active");

    });


    /* -----------------------------------------
       Hide all content pages
       ----------------------------------------- */

    contentPages.forEach(function (page) {

        page.classList.remove("active-page");

    });


    /* -----------------------------------------
       Open Dashboard after Login
       ----------------------------------------- */

    const dashboardButton =
        document.querySelector(
            '.nav-button[data-page="dashboard"]'
        );


    const dashboardPage =
        document.getElementById("dashboard");


    if (dashboardButton) {

        dashboardButton.classList.add("active");

    }


    if (dashboardPage) {

        dashboardPage.classList.add("active-page");

    }


    /* -----------------------------------------
       Update Header
       ----------------------------------------- */

    if (pageTitle) {

        pageTitle.textContent = "Dashboard";

    }


    if (pageDescription) {

        pageDescription.textContent =
            "Overview of your library";

    }

}


/* =========================================================
   LOGIN SYSTEM
   ========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            /* Prevent page refresh */

            event.preventDefault();


            /* Get entered username */

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            /* Get entered password */

            const password =
                document
                    .getElementById("password")
                    .value
                    .trim();


            /* Get selected role */

            const role =
                document
                    .getElementById("role")
                    .value;


            /* Get credentials for selected role */

            const selectedUser =
                users[role];


            /* -----------------------------------------
               Validate Login
               ----------------------------------------- */

            if (
                selectedUser &&
                username === selectedUser.username &&
                password === selectedUser.password
            ) {

                /* Save login session */

                sessionStorage.setItem(
                    "loggedIn",
                    "true"
                );


                sessionStorage.setItem(
                    "username",
                    username
                );


                sessionStorage.setItem(
                    "role",
                    role
                );


                /* Display username */

                if (displayUsername) {

                    displayUsername.textContent =
                        username;

                }


                /* Display role */

                if (displayRole) {

                    displayRole.textContent =
                        role;

                }


                /* APPLY ROLE PERMISSIONS */

                applyRolePermissions(role);


                /* Hide login page */

                if (loginPage) {

                    loginPage.classList.add(
                        "hidden"
                    );

                }


                /* Show application */

                if (appPage) {

                    appPage.classList.remove(
                        "hidden"
                    );

                }


                /* Clear login error */

                if (loginError) {

                    loginError.textContent = "";

                }

            }

            else {

                /* Invalid login */

                if (loginError) {

                    loginError.textContent =
                        "Invalid username, password or role.";

                }

            }

        }
    );

}


/* =========================================================
   SIDEBAR NAVIGATION
   ========================================================= */

navButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const pageName =
                button.dataset.page;


            /* Check whether page exists */

            if (!document.getElementById(pageName)) {

                return;

            }


            /* Remove active class */

            navButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            /* Add active class */

            button.classList.add("active");


            /* Hide all pages */

            contentPages.forEach(function (page) {

                page.classList.remove(
                    "active-page"
                );

            });


            /* Show selected page */

            document
                .getElementById(pageName)
                .classList.add(
                    "active-page"
                );


            /* Update title */

            if (pageTitle && pageInformation[pageName]) {

                pageTitle.textContent =
                    pageInformation[pageName].title;

            }


            /* Update description */

            if (
                pageDescription &&
                pageInformation[pageName]
            ) {

                pageDescription.textContent =
                    pageInformation[pageName].description;

            }

        }
    );

});


/* =========================================================
   QUICK PAGE LINKS
   ========================================================= */

const pageLinks =
    document.querySelectorAll(
        "[data-page-link]"
    );


pageLinks.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const pageName =
                button.dataset.pageLink;


            /* Check page */

            if (!document.getElementById(pageName)) {

                return;

            }


            /* Update sidebar active button */

            navButtons.forEach(function (nav) {

                nav.classList.remove("active");


                if (
                    nav.dataset.page ===
                    pageName
                ) {

                    nav.classList.add("active");

                }

            });


            /* Hide all pages */

            contentPages.forEach(function (page) {

                page.classList.remove(
                    "active-page"
                );

            });


            /* Show selected page */

            document
                .getElementById(pageName)
                .classList.add(
                    "active-page"
                );


            /* Update header */

            if (pageTitle && pageInformation[pageName]) {

                pageTitle.textContent =
                    pageInformation[pageName].title;

            }


            if (
                pageDescription &&
                pageInformation[pageName]
            ) {

                pageDescription.textContent =
                    pageInformation[pageName].description;

            }

        }
    );

});


/* =========================================================
   BOOK SEARCH
   ========================================================= */

const bookSearch =
    document.getElementById("bookSearch");


if (bookSearch) {

    bookSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                bookSearch.value.toLowerCase();


            const rows =
                document.querySelectorAll(
                    "#booksTable tr"
                );


            rows.forEach(function (row) {

                const rowText =
                    row.textContent.toLowerCase();


                if (
                    rowText.includes(searchValue)
                ) {

                    row.style.display = "";

                }

                else {

                    row.style.display = "none";

                }

            });

        }
    );

}


/* =========================================================
   ISSUE BOOK
   ========================================================= */

const issueForm =
    document.getElementById("issueForm");


if (issueForm) {

    issueForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(
                "Book issued successfully!"
            );


            issueForm.reset();

        }
    );

}


/* =========================================================
   RETURN BOOK
   ========================================================= */

const returnForm =
    document.getElementById("returnForm");


if (returnForm) {

    returnForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(
                "Book returned successfully!"
            );


            returnForm.reset();

        }
    );

}


/* =========================================================
   ADD BOOK
   ========================================================= */

const addBookButton =
    document.getElementById("addBookButton");


if (addBookButton) {

    addBookButton.addEventListener(
        "click",
        function () {

            /* Create Add Book Modal */

            const modal =
                document.createElement("div");


            modal.id = "addBookModal";


            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100%";
            modal.style.height = "100%";

            modal.style.background =
                "rgba(15, 23, 42, 0.45)";

            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";

            modal.style.zIndex = "9999";


            modal.innerHTML = `

                <div style="
                    width: 430px;
                    max-width: 90%;
                    background: #ffffff;
                    padding: 28px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                ">

                    <h2 style="
                        margin-bottom: 20px;
                        color: #334155;
                        font-size: 20px;
                    ">
                        Add New Book
                    </h2>


                    <form id="addBookForm">


                        <div style="margin-bottom: 15px;">

                            <label style="
                                display: block;
                                margin-bottom: 6px;
                                color: #475569;
                                font-size: 12px;
                                font-weight: 600;
                            ">
                                Book ID
                            </label>


                            <input
                                type="text"
                                id="newBookId"
                                placeholder="Example: B004"
                                required
                                style="
                                    width: 100%;
                                    height: 43px;
                                    padding: 0 12px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 7px;
                                    outline: none;
                                    box-sizing: border-box;
                                "
                            >

                        </div>


                        <div style="margin-bottom: 15px;">

                            <label style="
                                display: block;
                                margin-bottom: 6px;
                                color: #475569;
                                font-size: 12px;
                                font-weight: 600;
                            ">
                                Book Title
                            </label>


                            <input
                                type="text"
                                id="newBookTitle"
                                placeholder="Enter book title"
                                required
                                style="
                                    width: 100%;
                                    height: 43px;
                                    padding: 0 12px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 7px;
                                    outline: none;
                                    box-sizing: border-box;
                                "
                            >

                        </div>


                        <div style="margin-bottom: 15px;">

                            <label style="
                                display: block;
                                margin-bottom: 6px;
                                color: #475569;
                                font-size: 12px;
                                font-weight: 600;
                            ">
                                Author
                            </label>


                            <input
                                type="text"
                                id="newBookAuthor"
                                placeholder="Enter author name"
                                required
                                style="
                                    width: 100%;
                                    height: 43px;
                                    padding: 0 12px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 7px;
                                    outline: none;
                                    box-sizing: border-box;
                                "
                            >

                        </div>


                        <div style="margin-bottom: 15px;">

                            <label style="
                                display: block;
                                margin-bottom: 6px;
                                color: #475569;
                                font-size: 12px;
                                font-weight: 600;
                            ">
                                Category
                            </label>


                            <input
                                type="text"
                                id="newBookCategory"
                                placeholder="Example: Computer Science"
                                required
                                style="
                                    width: 100%;
                                    height: 43px;
                                    padding: 0 12px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 7px;
                                    outline: none;
                                    box-sizing: border-box;
                                "
                            >

                        </div>


                        <div style="margin-bottom: 20px;">

                            <label style="
                                display: block;
                                margin-bottom: 6px;
                                color: #475569;
                                font-size: 12px;
                                font-weight: 600;
                            ">
                                Available Copies
                            </label>


                            <input
                                type="number"
                                id="newBookAvailable"
                                min="0"
                                placeholder="Enter number of copies"
                                required
                                style="
                                    width: 100%;
                                    height: 43px;
                                    padding: 0 12px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 7px;
                                    outline: none;
                                    box-sizing: border-box;
                                "
                            >

                        </div>


                        <div style="
                            display: flex;
                            gap: 10px;
                            justify-content: flex-end;
                        ">


                            <button
                                type="button"
                                id="cancelAddBook"
                                style="
                                    padding: 9px 15px;
                                    border: 1px solid #d5dce5;
                                    border-radius: 6px;
                                    background: #ffffff;
                                    color: #475569;
                                    cursor: pointer;
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                style="
                                    padding: 9px 15px;
                                    border: none;
                                    border-radius: 6px;
                                    background: #1d4f91;
                                    color: #ffffff;
                                    cursor: pointer;
                                "
                            >
                                Add Book
                            </button>


                        </div>


                    </form>

                </div>

            `;


            document.body.appendChild(modal);


            /* Cancel Button */

            const cancelButton =
                document.getElementById(
                    "cancelAddBook"
                );


            if (cancelButton) {

                cancelButton.addEventListener(
                    "click",
                    function () {

                        modal.remove();

                    }
                );

            }


            /* Add Book Form */

            const addBookForm =
                document.getElementById(
                    "addBookForm"
                );


            if (addBookForm) {

                addBookForm.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();


                        const bookId =
                            document
                                .getElementById(
                                    "newBookId"
                                )
                                .value
                                .trim();


                        const title =
                            document
                                .getElementById(
                                    "newBookTitle"
                                )
                                .value
                                .trim();


                        const author =
                            document
                                .getElementById(
                                    "newBookAuthor"
                                )
                                .value
                                .trim();


                        const category =
                            document
                                .getElementById(
                                    "newBookCategory"
                                )
                                .value
                                .trim();


                        const available =
                            parseInt(
                                document
                                    .getElementById(
                                        "newBookAvailable"
                                    )
                                    .value
                            );


                        /* Check duplicate Book ID */

                        const existingRows =
                            document.querySelectorAll(
                                "#booksTable tr"
                            );


                        let duplicate = false;


                        existingRows.forEach(
                            function (row) {

                                const firstCell =
                                    row.querySelector("td");


                                if (
                                    firstCell &&
                                    firstCell.textContent
                                        .trim()
                                        .toLowerCase() ===
                                    bookId.toLowerCase()
                                ) {

                                    duplicate = true;

                                }

                            }
                        );


                        if (duplicate) {

                            alert(
                                "Book ID already exists."
                            );

                            return;

                        }


                        /* Create New Table Row */

                        const newRow =
                            document.createElement(
                                "tr"
                            );


                        const status =
                            available > 0
                                ? `
                                    <span class="status available-status">
                                        Available
                                    </span>
                                  `
                                : `
                                    <span class="status unavailable-status">
                                        Not Available
                                    </span>
                                  `;


                        newRow.innerHTML = `

                            <td>${bookId}</td>

                            <td>${title}</td>

                            <td>${author}</td>

                            <td>${category}</td>

                            <td>${available}</td>

                            <td>${status}</td>

                        `;


                        /* Add row to table */

                        const booksTable =
                            document.getElementById(
                                "booksTable"
                            );


                        if (booksTable) {

                            booksTable.appendChild(
                                newRow
                            );

                        }


                        /* Update Total Books */

                        const totalBooks =
                            document.getElementById(
                                "totalBooks"
                            );


                        if (totalBooks) {

                            const currentTotal =
                                parseInt(
                                    totalBooks.textContent
                                ) || 0;


                            totalBooks.textContent =
                                currentTotal + 1;

                        }


                        /* Close Modal */

                        modal.remove();


                        /* Success Message */

                        alert(
                            "Book added successfully!"
                        );

                    }
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            /* Clear session */

            sessionStorage.clear();


            /* Hide application */

            if (appPage) {

                appPage.classList.add(
                    "hidden"
                );

            }


            /* Show login page */

            if (loginPage) {

                loginPage.classList.remove(
                    "hidden"
                );

            }


            /* Reset login form */

            if (loginForm) {

                loginForm.reset();

            }


            /* Clear error */

            if (loginError) {

                loginError.textContent = "";

            }


            /* Reset sidebar visibility */

            navButtons.forEach(function (button) {

                button.style.display = "";

            });


            /* Reset active navigation */

            navButtons.forEach(function (button) {

                button.classList.remove("active");

            });


            /* Reset pages */

            contentPages.forEach(function (page) {

                page.classList.remove(
                    "active-page"
                );

            });


            /* Show dashboard by default */

            const dashboardButton =
                document.querySelector(
                    '.nav-button[data-page="dashboard"]'
                );


            const dashboardPage =
                document.getElementById(
                    "dashboard"
                );


            if (dashboardButton) {

                dashboardButton.classList.add(
                    "active"
                );

            }


            if (dashboardPage) {

                dashboardPage.classList.add(
                    "active-page"
                );

            }

        }
    );

}
