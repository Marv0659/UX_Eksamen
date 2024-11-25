import { BASE_URL } from "../js/common.js";

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
