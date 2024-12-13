import { BASE_URL, showToast } from "../js/common.js";
import { getCookie } from "../js/cookieUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  const role = getCookie("role");

  if (role) {
    // User is not authorized
    showToast("You are already logged in. Logout to go to this page.");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  } else {
    // User is authorized, show the page content
    pageContent.style.display = "grid";
  }
});

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  

  // Prepare request body
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  // Make the fetch request
  fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      
      console.log(data);
      if (Object.keys(data).includes("user_id")) {
        document.cookie = `email=${email}`;
        if (email === "admin.library@mail.com") {
          document.cookie = `role=admin`;
        } else {
          document.cookie = `role=user`;
        }
        if (getCookie("role") === "admin") {
          window.location.href = "admin.html";
        } else {
          document.cookie = `user_id=${data.user_id};path=/;samesite=strict`;
          window.location.href = "index.html";
        }
      } else {
        showToast(data.error);
      }
    })
    .catch((error) => {
      showToast("Something went wrong. Please try again later.");
    });
});
