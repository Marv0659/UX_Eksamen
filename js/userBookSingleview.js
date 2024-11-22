import { BASE_URL } from "./common.js";
import { getCookie } from "./cookieUtils.js";

// Get the book ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Function to check if the user is logged in
function isLoggedIn() {
  return !!getCookie("email"); // Returns true if the email cookie exists
}

// Function to loan a book
function userLoanBook() {
  const userId = getCookie("user_id"); // Get the user ID from cookies

  if (!userId || !bookId) {
    alert("Invalid user or book ID. " + "userId: " + userId + "bookId: " + bookId);
    return;
  }

  // Make the POST request to loan the book
  fetch(`${BASE_URL}/users/${userId}/books/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        alert("Book loaned successfully!");
      } else {
        alert(data.error || "Unable to loan the book.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while processing your loan request.");
    });
}

// Function to fetch and display book details
async function fetchBookDetails() {
  try {
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

  // If there's no cover image, use a default image
  if (!book.cover || book.cover.trim() === "") {
    book.cover = "../Imgs/pexels-stasknop-1340588.webp";
  }

  // Loan button: Show "Loan" for logged-in users, "Login" for others
  const loanBtn = isLoggedIn() ? `<button type="button" class="loan-btn">Loan</button>` : `<a href="login.html" class="loan-btn">Login to loan</a>`;

  // Populate the singleview container with book details and the button
  singleviewContainer.innerHTML = `
    <h1>${book.title}</h1>
    <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover" />
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Publisher:</strong> ${book.publishing_company}</p>
    <p><strong>Year:</strong> ${book.publishing_year}</p>
    ${loanBtn}
  `;

  // Add event listener to the "Loan" button if it exists
  const loanButton = document.querySelector(".loan-btn");
  if (loanButton && isLoggedIn()) {
    loanButton.addEventListener("click", userLoanBook);
  }
}

// Fetch and display book details when the page loads
fetchBookDetails();
