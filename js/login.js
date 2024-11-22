import { BASE_URL } from "../js/common.js";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  document.cookie = `email=${email}`;
  if (email === "admin.library@mail.com") {
    document.cookie = `role=admin`;
  } else {
    document.cookie = `role=user`;
  }

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
        if (getCookie("role") === "admin") {
          window.location.href = "admin.html";
        } else {
          document.cookie = `user_id=${data.user_id};path=/;samesite=strict`;
          window.location.href = "index.html";
        }
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      alert("Error:", error);
    });
});
