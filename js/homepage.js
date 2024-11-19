import { BASE_URL } from "./common.js";

const NUM_BOOKS = 4;

// index
const randomBooks = document.querySelector(".random-books"); // Use querySelector for class

async function fetchRandomBooks(numberOfBooks) {
  try {
    const response = await fetch(`${BASE_URL}/books?n=${numberOfBooks}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const books = await response.json();
    console.log("Books:", books);
    displayBooks(books); // Call the display function with fetched books
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function displayBooks(books) {
  randomBooks.innerHTML = books
    .map(
      (book) => `
    <article class="book-article">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Publisher:</strong> ${book.publishing_company}</p>
      <p><strong>Year:</strong> ${book.publishing_year}</p>
      <a href="user-book-singleview.html?id=${book.book_id}">Details</a>
    </article>
  `
    )
    .join("");
}

fetchRandomBooks(NUM_BOOKS);
