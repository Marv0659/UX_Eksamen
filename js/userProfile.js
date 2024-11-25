import { BASE_URL, getCookie } from "./common.js";

console.log(getCookie("user_id"));

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
    displayUserDetails(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

// Function to display user details in the DOM
function displayUserDetails(user) {
  const profileContainer = document.querySelector(".profile");
  profileContainer.innerHTML = `
    <h2>Hello ${user.first_name} ${user.last_name}!</h2>
    <p>Email: ${user.email}</p>
    <p>Address: ${user.address}</p>
    <p>Phone: ${user.phone_number}</p>
    <p>Date of birth: ${user.birth_date}</p>
    <p>Member since: ${user.membership_date}</p>
    <div class="profile-actions">
      <a class="edit-btn" href="user-edit-profile.html">Edit Profile</a>
      <button class="delete-btn">Delete Profile</button>
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
}

// Fetch and display user details
fetchUserDetails();
