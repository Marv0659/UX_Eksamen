async function getAuthors(){
    try{
        const response = await fetch("http://localhost:8080/authors");

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        // Add image number to each author object when first loaded
        return data.map(author => ({
            ...author, 
            imageNumber: Math.floor(Math.random() * 10) + 1
        }));
    }
    catch (error){
        console.error("Fetch error: " + error)
        throw error
    }
}

function renderAuthors(authors) {
    const authorsContainer = document.querySelector(".authors_container");
    authorsContainer.innerHTML = authors.map(author => {        
        
        return `
        <article class="author_card">
            <img src="./imgs/avatars/profile_${author.imageNumber}.webp" alt="${author.author_name}" />
           <div>
                <h2>${author.author_name}</h2>
                <a href="author-Singleview.html?id=${author.author_id}&img=${author.imageNumber}">Read more</a>
           </div>
        </article>
        `
    }).join("");
}

async function initializeAuthorsPage(){
    try {
        const authors = await getAuthors();
        renderAuthors(authors);

        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredAuthors = authors.filter(author => 
                author.author_name.toLowerCase().includes(searchTerm)
            );
            renderAuthors(filteredAuthors);
        });
    } catch (error) {
        console.error("Error initializing authors page:", error);
    }
}

initializeAuthorsPage()