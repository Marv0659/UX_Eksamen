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
    pageContent.style.display = "block";
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

document.querySelector(".create-author-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#author_first_name").value;
  const lastName = document.querySelector("#author_last_name").value;
  

  // Prepare request body
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);

  // Make the fetch request
  fetch(`${BASE_URL}/admin/authors`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert("Author created successfully");
      }
    })
    .catch((error) => {
      alert("Error:", error);
    });
});
