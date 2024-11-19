const baseUrl = "http://127.0.0.1:8080";

document.querySelector(".signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const first_name = document.querySelector("#first_name").value;
  const last_name = document.querySelector("#last_name").value;
  const address = document.querySelector("#address").value;
  const phone_number = document.querySelector("#phone_number").value;
  const birth_date = document.querySelector("#birth_date").value;

  document.cookie = `email=${email}`;
  document.cookie = `role=user`;
  

  // Prepare request body
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  params.append("first_name", first_name);
  params.append("last_name", last_name);
  params.append("address", address);
  params.append("phone_number", phone_number);
  params.append("birth_date", birth_date);


  // Make the fetch request
  fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (Object.keys(data).includes("user_id")) {
          window.location.href = "index.html";
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      alert("Error:", error);
    });
});
