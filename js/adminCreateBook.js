import { BASE_URL, showToast } from "../js/common.js";
import { getCookie } from "../js/cookieUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  const role = getCookie("role");

  if (!role || role !== "admin") {
    // User is not authorized
    showToast("You are not authorized to view this page.");
    setTimeout(() => {
      window.location.href = role ? "index.html" : "login.html";
    }, 3000);
  } else {
    // User is authorized, show the page content
    pageContent.style.display = "grid";
  }
});


if (getCookie("role")) {
  if (getCookie("role") !== "admin") {
    alert("You are not authorized to view this page.");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 0);
  }
} else {
  alert("You are not authorized to view this page.");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 0);
}

document.querySelector(".create-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author_id").value;
  const publisher = document.querySelector("#publisher_id").value;
  const publisherYear = document.querySelector("#publishing_year").value;
 

  // Prepare request body
  const formData = new FormData();
  formData.append("title", title);
  formData.append("author_id", author);
  formData.append("publisher_id", publisher);
  formData.append("publishing_year", publisherYear);

  // Make the fetch request
  fetch(`${BASE_URL}/admin/books`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
if(data.error){
    alert(data.error);
}
else{
    alert("Book created successfully");
}

    })
    .catch((error) => {
      alert("Error:", error);
    });
});
