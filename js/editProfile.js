import { BASE_URL, getCookie } from "./common.js";

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
