import { BASE_URL } from "./common.js";

const NUM_BOOKS = 20;
const bookCards = document.querySelector(".random-books"); // Use querySelector for class

// Fetch the list of books from the server
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

// Display fetched books in the DOM
function displayBooks(books) {
  bookCards.innerHTML = books
    .map(
      (book) => `
    <article class="book-article">
      <div class="book-cover">
        <img src="./Imgs/HeroTest.png" alt="${book.title}" />
      </div>
      
      <div class="book-content">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Publisher:</strong> ${book.publishing_company}</p>
      <p><strong>Year:</strong> ${book.publishing_year}</p>
      <a class="detailsBtn" href="user-book-singleview.html?id=${book.book_id}">Details</a>
      </div>
      </article>
  `
    )
    .join("");
}

// Trigger the fetch
fetchRandomBooks(NUM_BOOKS);

//export
export { fetchRandomBooks, displayBooks }; // Export the functions for testing
