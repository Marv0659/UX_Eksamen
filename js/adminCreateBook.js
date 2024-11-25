import { BASE_URL } from "../js/common.js";


document.querySelector(".create-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author_id").value;
  const publisher = document.querySelector("#publisher_id").value;
  const publisherYear = document.querySelector("#publishing_year").value;
 

  // Prepare request body
  const formData = new FormData();
  formData.append("title", title);
  formData.append("author_id", author);
  formData.append("publisher_id", publisher);
  formData.append("publishing_year", publisherYear);

  // Make the fetch request
  fetch(`${BASE_URL}/admin/books`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
if(data.error){
    alert(data.error);
}
else{
    alert("Book created successfully");
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
