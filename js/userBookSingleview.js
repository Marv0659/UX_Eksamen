import { BASE_URL } from "./common.js";
import { getCookie } from "./cookieUtils.js";
// Get the book ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

function isLoggedIn() {
  return !!getCookie("email"); // Returns true if the email cookie exists
}

// Use the login status in your logic
if (isLoggedIn()) {
  console.log("User is logged in");
} else {
  console.log("User is not logged in");
  // Optionally, redirect to the login page
  //window.location.href = "login.html";
}

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

  // if theres no cover image, use a default image
  if (book.cover === "") {
    book.cover = "../Imgs/pexels-stasknop-1340588.webp";
  }

  const loanBtn = isLoggedIn() ? `<button class="loan-btn">Loan</button>` : `<a href="login.html" class="loan-btn">Login to loan</a>`;

  // Populate the singleview div with book details
  singleviewContainer.innerHTML = `
    <h1>${book.title}</h1>
    
    <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover"/>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Publisher:</strong> ${book.publishing_company}</p>
    <p><strong>Year:</strong> ${book.publishing_year}</p>
    ${loanBtn}
  `;
}

// Fetch and display the book details when the page loads
fetchBookDetails();
