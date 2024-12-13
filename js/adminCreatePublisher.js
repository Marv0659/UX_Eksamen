import { BASE_URL, showToastError, showToastSuccess } from "../js/common.js";
import { getCookie } from "../js/cookieUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  const role = getCookie("role");

  if (!role || role !== "admin") {
    // User is not authorized
    showToastError("You are not authorized to view this page.");
    setTimeout(() => {
      window.location.href = role ? "index.html" : "login.html";
    }, 3000);
  } else {
    // User is authorized, show the page content
    pageContent.style.display = "grid";
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
        showToastError(data.error);
      } else {
        showToastSuccess("Publisher created successfully");
      }
    })
    .catch((error) => {
      showToastError("Please fill out all fileds", error);
    });
});
