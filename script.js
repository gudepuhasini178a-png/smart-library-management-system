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

            displayUsername.textContent =
                username;


            /* Display role */

            displayRole.textContent =
                role;


            /* -----------------------------------------
               APPLY ROLE PERMISSIONS
               ----------------------------------------- */

            applyRolePermissions(role);


            /* Hide login page */

            loginPage.classList.add(
                "hidden"
            );


            /* Show application */

            appPage.classList.remove(
                "hidden"
            );


            /* Clear login error */

            loginError.textContent = "";

        }

        else {

            /* Invalid login */

            loginError.textContent =
                "Invalid username, password or role.";

        }

    }
);


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

            pageTitle.textContent =
                pageInformation[pageName].title;


            /* Update description */

            pageDescription.textContent =
                pageInformation[pageName].description;

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

            pageTitle.textContent =
                pageInformation[pageName].title;


            pageDescription.textContent =
                pageInformation[pageName].description;

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

            alert(
                "Add Book feature is ready for backend integration."
            );

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

            appPage.classList.add(
                "hidden"
            );


            /* Show login page */

            loginPage.classList.remove(
                "hidden"
            );


            /* Reset login form */

            loginForm.reset();


            /* Clear error */

            loginError.textContent = "";


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
                document.getElementById("dashboard");


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