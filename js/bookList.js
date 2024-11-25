import { BASE_URL, getCookie } from "./common.js";

const NUM_BOOKS = 500;
const bookCards = document.querySelector(".random-books"); // Use querySelector for class
const searchInput = document.querySelector(".search-input");

// Fetch the list of books from the server
async function fetchRandomBooks(numberOfBooks) {
  try {
    const response = await fetch(`${BASE_URL}/books?n=${numberOfBooks}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const books = await response.json();
    console.log("Books:", books);
    displayBooks(books); // Call the display function with fetched books

    // Add search functionality
    setupSearch(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Function to display books in the DOM
function displayBooks(books) {
  if (books.length === 0) {
    bookCards.innerHTML = `<p class="no-results">No books found.</p>`;
    return;
  }


  if (getCookie("role") === "admin") {
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
          <a class="detailsBtn" href="admin-book-singleview.html?id=${book.book_id}">Details</a>
        </div>
      </article>
    `
    )
    .join("");
  }
  else{
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
}

// Function to set up search functionality
function setupSearch(books) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Filter books based on search term
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm));

    // Display filtered books
    displayBooks(filteredBooks);
  });
}

// Trigger the fetch and setup
fetchRandomBooks(NUM_BOOKS);

export { fetchRandomBooks, displayBooks };
