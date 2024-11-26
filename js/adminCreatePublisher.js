import { BASE_URL, getCookie, showToast } from "../js/common.js";

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



document.querySelector(".create-publisher-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#publisher_name").value;


  // Prepare request body
  const formData = new FormData();
  formData.append("name", name);


  // Make the fetch request
  fetch(`${BASE_URL}/admin/publishers`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert("Publisher created successfully");
      }
    })
    .catch((error) => {
      alert("Error:", error);
    });
});
