import { BASE_URL, showToastError } from "./common.js";
import { getCookie } from "./cookieUtils.js";


document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  const role = getCookie("role");

  if (!role || role !== "admin") {
    // User is not authorized
    showToastError("You are not authorized to view this page.");
    setTimeout(() => {
      window.location.href = role ? "index.html" : "login.html";
    }, 3000);
  } else {
    // User is authorized, show the page content
    pageContent.style.display = "grid";
  }
});

// Get the book ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");



// Function to fetch and display book details
async function fetchBookDetails() {
  try {
    const response = await fetch(`${BASE_URL}/admin/books/${bookId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const book = await response.json();
    displayBookDetails(book);
  } catch (error) {
    showToastError("Error fetching book details:", error);
  }
}

// Function to display book details in the DOM
function displayBookDetails(book) {
  const singleviewContainer = document.querySelector(".singleview");
  const loanContainer = document.querySelector(".loans-container");
  // If there's no cover image, use a default image
  if (!book.cover || book.cover.trim() === "") {
    book.cover = "../Imgs/pexels-stasknop-1340588.webp";
  }

  // Loan button: Show "Loan" for logged-in users, "Login" for others



  // Populate the singleview container with book details and the button
singleviewContainer.innerHTML = `
    <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover" />
    <div class="book-info">
        <h1>${book.title}</h1>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Publisher:</strong> ${book.publishing_company}</p>
        <p><strong>Year:</strong> ${book.publishing_year}</p>
    </div>
`;

loanContainer.innerHTML = `
 <div class="book-loans">
            <h2>Loan Details</h2>
            <ul>
                    ${book.loans
                      .map(
                        (loan, index) => `
                            <li>
                                    <p><strong>Loan ${index + 1}:</strong></p>
                                    <p><strong>User ID:</strong> ${loan.user_id}</p>
                                    <p><strong>Loan Date:</strong> ${loan.loan_date}</p>
                            </li>
                    `
                      )
                      .join("")}
            </ul>
        </div>
`;

}


// Fetch and display book details when the page loads
fetchBookDetails();
