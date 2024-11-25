import { BASE_URL } from "../js/common.js";

document.querySelector(".create-author-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#author_first_name").value;
  const lastName = document.querySelector("#author_last_name").value;
  

  // Prepare request body
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);

  // Make the fetch request
  fetch(`${BASE_URL}/admin/authors`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert("Author created successfully");
      }

      //   if (Object.keys(data).includes("book_id")) {
      //     alert("Book created successfully");
      //   } else if (Object.keys(data).includes("error")) {
      //     alert(data.error);
      //   }
    })
    .catch((error) => {
      alert("Error:", error);
    });
});
