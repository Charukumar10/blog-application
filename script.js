
function showMessage() {
    alert("Welcome! Explore our latest blogs.");
}

function loginUser(event) {
    event.preventDefault();
    alert("Login button clicked successfully!");
}

function registerUser(event) {
    event.preventDefault();
    alert("Registration button clicked successfully!");
}

function createBlog(event) {
    event.preventDefault();

    let title = document.getElementById("blogTitle").value;
    let content = document.getElementById("blogContent").value;

    alert("Blog Published Successfully!\nTitle: " + title);
}
