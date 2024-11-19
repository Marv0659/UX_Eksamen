import { BASE_URL, loggedUserID } from "./common.js";

// Get the book ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Function to fetch and display book details
async function fetchBookDetails() {
  try {
    // Fetch book details from the API
    const response = await fetch(`${BASE_URL}/books/${bookId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const book = await response.json();
    displayBookDetails(book);
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}

// Function to display book details in the DOM
function displayBookDetails(book) {
  const singleviewContainer = document.querySelector(".singleview");

  // if user is logged in, display the "loan" button

  // Populate the singleview div with book details
  singleviewContainer.innerHTML = `
    <h1>${book.title}</h1>
    <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover"/>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Publisher:</strong> ${book.publishing_company}</p>
    <p><strong>Year:</strong> ${book.publishing_year}</p>
  `;
}

// Fetch and display the book details when the page loads
fetchBookDetails();
