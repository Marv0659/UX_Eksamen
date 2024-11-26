import { BASE_URL } from "./common.js";
import { getCookie } from "./cookieUtils.js";

document.querySelector(".edit-profile").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(e.target);
  const userID = getCookie("user_id");

  if (!userID) {
    alert("User ID not found. Please log in.");
    return;
  }

  try {
    // Make the PUT request
    const response = await fetch(`${BASE_URL}/users/${userID}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    console.log("Response data:", data);

    // Check for status in the response
    if (data.status === "ok") {
      alert("User updated successfully");
      window.location.href = "user-profile.html"; // Redirect to profile page
    } else {
      alert(data.error || "Unexpected response format");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert(`An error occurred: ${error.message}`);
  }
});

// Fetch user details and populate the form
async function fetchUserDetails() {
  const userID = getCookie("user_id");

  if (!userID) {
    alert("User ID not found. Please log in.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userID}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    console.log("User details:", user);

    // Populate the form with user details
    const form = document.querySelector(".edit-profile");
    form.elements["first_name"].value = user.first_name;
    form.elements["last_name"].value = user.last_name;
    form.elements["email"].value = user.email;
    form.elements["phone"].value = user.phone_number;
    form.elements["address"].value = user.address;
    form.elements["birth_date"].value = user.birth_date;
  } catch (error) {
    console.error("Error fetching user details:", error);
    alert(`An error occurred: ${error.message}`);
  }
}

fetchUserDetails();
