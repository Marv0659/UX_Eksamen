async function getAuthors(){
    try{
        const response = await fetch("http://localhost:8080/authors");

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        return data
    }
    catch (error){
        console.error("Fetch error: " + error)
        throw error
    }
}



// async function findBooks() {
//     try {
//         const booksData = [];
        
//         for (const author of authors) {
//             try {
//                 const response = await fetch(`http://localhost:8080/books?a=${author.author_id}`);
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
//                 booksData.push(data);
//             } catch (error) {
//                 console.error(`Error fetching books for author ${author.author_id}:`, error);
//                 // Handle error as needed
//             }
//         }

//         console.log(booksData);
//         return booksData;

//     } catch (error) {
//         console.error("Error in findBooks:", error);
//         throw error;
//     }
// }

function generateNumb(){
    return Math.floor(Math.random() * 100) + 1;
}


async function showAuthors(){

    const authors = await getAuthors()

    const allHTML = authors.map(author => 
        `
        <article>
            <img src="assets/imgs/authors/profile_${generateNumb()}.webp">
            <h2>${author.author_name}</h2>
            <a></a>
        </article>
        `

    ).join("");
    document.querySelector(".authors_container").innerHTML += allHTML
    console.log(authors)
}


showAuthors()
findBooks()
