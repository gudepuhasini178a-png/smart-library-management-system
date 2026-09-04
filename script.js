const USERS = {
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


/* BOOKS */

let books = [
    {
        id: "B001",
        title: "Data Structures",
        author: "Mark Allen Weiss",
        category: "Computer Science",
        total: 100,
        available: 90
    },

    {
        id: "B002",
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        category: "Computer Science",
        total: 100,
        available: 88
    },

    {
        id: "B003",
        title: "Operating Systems",
        author: "Abraham Silberschatz",
        category: "Computer Science",
        total: 100,
        available: 82
    },

    {
        id: "B004",
        title: "Database Management Systems",
        author: "Raghu Ramakrishnan",
        category: "Database",
        total: 100,
        available: 91
    },

    {
        id: "B005",
        title: "Java Programming",
        author: "Herbert Schildt",
        category: "Programming",
        total: 100,
        available: 94
    },

    {
        id: "B006",
        title: "Python Programming",
        author: "Eric Matthes",
        category: "Programming",
        total: 100,
        available: 90
    },

    {
        id: "B007",
        title: "Artificial Intelligence",
        author: "Stuart Russell",
        category: "Technology",
        total: 100,
        available: 86
    },

    {
        id: "B008",
        title: "Web Development",
        author: "Jon Duckett",
        category: "Web Technology",
        total: 100,
        available: 92
    },

    {
        id: "B009",
        title: "Engineering Mathematics",
        author: "B. S. Grewal",
        category: "Engineering",
        total: 100,
        available: 91
    },

    {
        id: "B010",
        title: "Physics",
        author: "H. C. Verma",
        category: "Science",
        total: 100,
        available: 88
    },

    {
        id: "B011",
        title: "Chemistry",
        author: "R. K. Gupta",
        category: "Science",
        total: 100,
        available: 92
    },

    {
        id: "B012",
        title: "English Literature",
        author: "William Shakespeare",
        category: "Literature",
        total: 50,
        available: 44
    }
];


/* STUDENTS */

let students = [
    {
        id: "S001",
        name: "Rahul Kumar",
        course: "B.Tech CSE",
        email: "rahul@example.com",
        status: "Active"
    },

    {
        id: "S002",
        name: "Ananya Reddy",
        course: "B.Tech ECE",
        email: "ananya@example.com",
        status: "Active"
    },

    {
        id: "S003",
        name: "Vikram Singh",
        course: "B.Tech IT",
        email: "vikram@example.com",
        status: "Active"
    },

    {
        id: "S004",
        name: "Priya Sharma",
        course: "B.Tech CSE",
        email: "priya@example.com",
        status: "Active"
    },

    {
        id: "S005",
        name: "Arjun Reddy",
        course: "B.Tech EEE",
        email: "arjun@example.com",
        status: "Active"
    }
];


/* LOGIN */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const role =
            document.getElementById("role").value;

        const error =
            document.getElementById("loginError");

        if (
            USERS[role] &&
            USERS[role].username === username &&
            USERS[role].password === password
        ) {

            document
                .getElementById("loginPage")
                .classList.add("hidden");

            document
                .getElementById("appPage")
                .classList.remove("hidden");

            document.getElementById("loggedUser").textContent =
                username;

            document.getElementById("loggedRole").textContent =
                role;

            error.textContent = "";

        } else {

            error.textContent =
                "Invalid username, password or role.";

        }
    });


/* NAVIGATION */

document.querySelectorAll(".nav-button").forEach(button => {

    button.addEventListener("click", function() {

        const pageName = this.dataset.page;

        document
            .querySelectorAll(".nav-button")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        document
            .querySelectorAll(".content-page")
            .forEach(page => page.classList.remove("active-page"));

        const page =
            document.getElementById(pageName);

        if (page) {
            page.classList.add("active-page");
        }

        if (pageName === "books") {
            renderBooks();
        }

        if (pageName === "students") {
            renderStudents();
        }
    });
});


/* BOOK RENDER */

function renderBooks(search = "") {

    const table =
        document.getElementById("booksTable");

    if (!table) return;

    const text = search.toLowerCase();

    const filteredBooks =
        books.filter(book =>
            book.id.toLowerCase().includes(text) ||
            book.title.toLowerCase().includes(text) ||
            book.author.toLowerCase().includes(text) ||
            book.category.toLowerCase().includes(text)
        );

    table.innerHTML = "";

    filteredBooks.forEach(book => {

        const row =
            document.createElement("tr");

        let status = "Available";
        let statusClass = "green";

        if (book.available === 0) {
            status = "Unavailable";
            statusClass = "red";
        } else if (book.available < 10) {
            status = "Low Stock";
            statusClass = "yellow";
        }

        row.innerHTML = `
            <td><strong>${book.id}</strong></td>

            <td>
                <strong>📚 ${book.title}</strong>
            </td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.total}</td>

            <td>${book.available}</td>

            <td>
                <span class="badge ${statusClass}">
                    ${status}
                </span>
            </td>
        `;

        table.appendChild(row);
    });
}


/* STUDENTS */

function renderStudents(search = "") {

    const table =
        document.getElementById("studentsTable");

    if (!table) return;

    const text =
        search.toLowerCase();

    const filtered =
        students.filter(student =>
            student.id.toLowerCase().includes(text) ||
            student.name.toLowerCase().includes(text) ||
            student.course.toLowerCase().includes(text) ||
            student.email.toLowerCase().includes(text)
        );

    table.innerHTML = "";

    filtered.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td>
                <span class="badge green">
                    ${student.status}
                </span>
            </td>
        `;

        table.appendChild(row);
    });
}


/* SEARCH */

document
    .getElementById("bookSearch")
    .addEventListener("input", function() {

        renderBooks(this.value);

    });


document
    .getElementById("studentSearch")
    .addEventListener("input", function() {

        renderStudents(this.value);

    });


/* ADD BOOK */

document
    .getElementById("addBookButton")
    .addEventListener("click", function() {

        const title =
            prompt("Enter book title:");

        if (!title) return;

        const author =
            prompt("Enter author name:");

        if (!author) return;

        const category =
            prompt("Enter category:");

        if (!category) return;

        const book = {
            id: "B" + String(books.length + 1).padStart(3, "0"),
            title: title,
            author: author,
            category: category,
            total: 1,
            available: 1
        };

        books.push(book);

        renderBooks();

        alert("Book added successfully!");

    });


/* ADD STUDENT */

document
    .getElementById("addStudentButton")
    .addEventListener("click", function() {

        const name =
            prompt("Enter student name:");

        if (!name) return;

        const course =
            prompt("Enter course:");

        if (!course) return;

        const email =
            prompt("Enter email:");

        if (!email) return;

        const student = {
            id: "S" + String(students.length + 1).padStart(3, "0"),
            name: name,
            course: course,
            email: email,
            status: "Active"
        };

        students.push(student);

        renderStudents();

        alert("Student added successfully!");

    });


/* ISSUE */

document
    .getElementById("issueForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Book issued successfully!");

        this.reset();

    });


/* RETURN */

document
    .getElementById("returnForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Book returned successfully!");

        this.reset();

    });


/* LOGOUT */

document
    .getElementById("logoutButton")
    .addEventListener("click", function() {

        document
            .getElementById("appPage")
            .classList.add("hidden");

        document
            .getElementById("loginPage")
            .classList.remove("hidden");

        document
            .getElementById("loginForm")
            .reset();

    });


/* INITIAL DATA */

renderBooks();
renderStudents();
