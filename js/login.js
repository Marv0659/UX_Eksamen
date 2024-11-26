import { BASE_URL, getCookie } from "../js/common.js";

if (getCookie("role")){
    alert("You are already logged in.");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 0); 
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
