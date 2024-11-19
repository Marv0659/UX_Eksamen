const baseUrl = "http://127.0.0.1:8080";

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

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Prepare request body
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  // Make the fetch request
  fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
   .then(response => response.json())
    .then(data => {
        console.log(data);
        if (Object.keys(data).includes('user_id')) {
            if(getCookie("role") === "admin") {
                window.location.href = 'admin.html';
            }
            else{
            window.location.href = 'index.html';
            }
        } else {
            alert(data.error)
        }
    }
    )
    .catch((error) => {
      alert("Error:", error);
    });
});
