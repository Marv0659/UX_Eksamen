import { BASE_URL, showToastError, showToastSuccess } from "./common.js";
import { getCookie, clearAllCookies } from "./cookieUtils.js";

console.log(getCookie("user_id"));

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  const role = getCookie("role");

  if (!role) {
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

// Function to fetch and display user details
async function fetchUserDetails() {
  const userId = getCookie("user_id");
  if (!userId) {
    console.error("User ID not found in cookies.");
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const user = await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

// Function to display user details in the DOM
/* function displayUserDetails(user) {
  const profileContainer = document.querySelector(".profile_container");
  profileContainer.innerHTML = `
    <h2>Hello ${user.first_name} ${user.last_name}!</h2>
    <p>Email: ${user.email}</p>
    <p>Address: ${user.address}</p>
    <p>Phone: ${user.phone_number}</p>
    <p>Date of birth: ${user.birth_date}</p>
    <p>Member since: ${user.membership_date}</p>
    <div class="profile-actions">
      <a class="edit-btn" href="user-edit-profile.html">Edit Profile</a>
      
    </div>
  `;

  // Add event listener for delete button AFTER the DOM is updated
  const deleteButton = document.querySelector(".delete-btn");
  deleteButton.addEventListener("click", async () => {
    const userId = getCookie("user_id");
    if (!userId) {
      console.error("User ID not found in cookies.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        alert("User deleted successfully");
        window.location.href = "login.html";
      } else {
        alert(data.error || "Unexpected response format");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`An error occurred: ${error.message}`);
    }
  });
} */

// Fetch and display user details
fetchUserDetails();
const user_id = getCookie("user_id");

async function getProfile() {
  try {
    const response = await fetch(BASE_URL + "/users/" + user_id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: " + error);
    throw error;
  }
}

async function drawProfile() {
  const user = await getProfile();

  document.querySelector("h1").textContent = `Hi ${user.first_name} ${user.last_name}`

  const profile = `
    
    <img src="Imgs/avatars/profile_1.webp" class="profile_pic">
    <dl>
    <div>
        <dt >First name</dt>
        <dd>${user.first_name}</dd>
    </div>
    <div>
        <dt >Last name</dt>
        <dd>${user.last_name}</dd>
    </div>
    <div>
        <dt >E-mail</dt>
        <dd>${user.email}</dd>
    </div>
    <div>
        <dt >Phone number</dt>
        <dd>${user.phone_number}</dd>
    </div>
    <div>
        <dt >Address</dt>
        <dd>${user.address}</dd>
    </div>
    <div>
        <dt >Birth date</dt>
        <dd>${user.birth_date}</dd>
    </div>
    <div>
        <dt>Membership created at</dt>
        <dd>${user.membership_date}</dd>
    </div>
    </dl>

    
    `;

const deleteButton = document.querySelector(".delete-btn");
  deleteButton.addEventListener("click", async () => {
    const userId = getCookie("user_id");
    if (!userId) {
      console.error("User ID not found in cookies.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        // delete cookie
        clearAllCookies();
        showToastSuccess("User deleted successfully");
        window.location.href = "login.html";
      } else {
        showToastError(data.error || "Unexpected response format");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToastError(`An error occurred: ${error.message}`);
    }
  });

  document.querySelector(".profile_info").innerHTML += profile;
}

drawProfile();
