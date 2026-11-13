
const API_URL = "http://localhost:5000";

// 1. Welcome Message
function showMessage() {
    alert("Welcome! Explore our latest blogs.");
}

// 2. User Registration
async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Registration Error:", error);
        alert("Unable to connect to the server.");
    }
}

// 3. User Login
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Login Error:", error);
        alert("Unable to connect to the server.");
    }
}

// 4. Create Blog
async function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value.trim();
    const content = document.getElementById("blogContent").value.trim();

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
        alert("Please login before creating a blog.");
        window.location.href = "login.html";
        return;
    }

    if (!title || !content) {
        alert("Please fill in all fields.");
        return;
    }

    const user = JSON.parse(storedUser);

    try {
        const response = await fetch(`${API_URL}/api/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content,
                author: user.name
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Create Blog Error:", error);
        alert("Unable to connect to the server.");
    }
}

// 5. Display All Blogs
async function loadBlogs() {
    const blogContainer = document.getElementById("blogList");

    if (!blogContainer) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/blogs`);
        const blogs = await response.json();

        if (!response.ok) {
            throw new Error("Failed to load blogs");
        }

        blogContainer.innerHTML = "";

        const totalBlogs = document.getElementById("totalBlogs");
        const publishedBlogs = document.getElementById("publishedBlogs");

        if (totalBlogs) {
            totalBlogs.textContent = blogs.length;
        }

        if (publishedBlogs) {
            publishedBlogs.textContent = blogs.length;
        }

        if (blogs.length === 0) {
            blogContainer.innerHTML = "<p>No blogs available yet.</p>";
            return;
        }

        blogs.forEach(blog => {
            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";

            const heading = document.createElement("h3");
            heading.textContent = blog.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = blog.content;

            const author = document.createElement("small");
            author.textContent = "By " + blog.author;

            blogCard.appendChild(heading);
            blogCard.appendChild(paragraph);
            blogCard.appendChild(author);

            blogContainer.appendChild(blogCard);
        });

    } catch (error) {
        console.error("Loading Blogs Error:", error);
        blogContainer.textContent = "Unable to load blogs.";
    }
}

// 6. Logout
function logoutUser() {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}

// Automatically load blogs when Dashboard opens
document.addEventListener("DOMContentLoaded", loadBlogs);
