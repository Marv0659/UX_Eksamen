import { BASE_URL, showToastError } from "../js/common.js";

document.querySelector(".signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const first_name = e.target.first_name.value;
  const last_name = e.target.last_name.value;
  const address = e.target.address.value;
  const phone_number = e.target.phone_number.value;
  const birth_date = e.target.birth_date.value;
  

  // Prepare request body
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("address", address);
    formData.append("phone_number", phone_number);
    formData.append("birth_date", birth_date);

    // Make the fetch request
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: formData, // Pass the FormData object directly
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Object.keys(data).includes("user_id")) {
          window.location.href = "login.html";
        } else {
          showToastError(data.error);
        }
      })
      .catch((error) => {
        showToastError("Please fill out all fields", error);
      });
});
