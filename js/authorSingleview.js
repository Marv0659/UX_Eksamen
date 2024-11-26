const params = new URLSearchParams(window.location.search)

const id = params.get("id")
const img = params.get("img")

const author_text = [
  "A storyteller with a unique voice, crafting tales that captivate readers across genres, blending imagination with universal appeal.",
  "Known for bringing characters and worlds to life, creating stories that resonate with readers of all ages and backgrounds.",
  "An explorer of ideas, pushing the boundaries of fiction by blending reality and fantasy into unforgettable narratives.",
  "Driven by a love for storytelling, the aim is always to inspire, entertain, and connect on a meaningful level.",
  "With inspiration drawn from diverse cultures, the stories created transport readers to vibrant and immersive settings.",
  "Known for weaving emotion into every page, crafting stories that linger long after the final chapter is read.",
  "Combining meticulous research with vivid imagination, history is brought to life through compelling, immersive narratives.",
  "Creating gripping plots and unforgettable characters, every story is designed to keep readers turning the pages.",
  "Themes of identity, belonging, and humanity are explored through writing that’s both thoughtful and evocative.",
  "Balancing classic storytelling techniques with modern themes, the work appeals to readers across generations."
]




async function getAuthor() {
    try{
        const response = await fetch(`http://localhost:8080/books?a=${id}`);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        return data
    }
    catch (error){
        console.error("Fetch error: " + error)
        throw error
}}


const data = await getAuthor()

function showauthor(){
    const herosection = `
    
        <img src="../Imgs/avatars/profile_${img}.webp">
       <div class="author_info">
            <h2>${data[0].author}</h2>
            <p>Amount of books: ${data.length}</p>
            <p>${author_text[img-1]}</p>
       </div>
    
    `

    document.querySelector("#author_container").innerHTML += herosection

    const authorBooks = data
      .map(
        (book) => `
        
        <article>
            <img src="../Imgs/pexels-stasknop-1340588.webp">
            <div>
                <h3>${book.title}</h3>
                <p>Written by: ${book.author}</p>
                <p>Published: ${book.publishing_year}</p>
                <p>Publishing company: ${book.publishing_company}</p>
            </div>
        </article>
        
        `
      )
      .join("");

        document.querySelector(".authors_books").innerHTML += authorBooks

}


showauthor()