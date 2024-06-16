
alert("IT DOES NOT WORK BECAUSE OF APIs restriction")
const apikey = '1a1e9fad5ce44a1b9573269bdcd2ab50';
const bolgcontainer = document.getElementById('bolg-container');

const SeaecgFiled=document.getElementById('input-search')
const SeaecgButton=document.getElementById('input-button')

console.log(SeaecgFiled)
async function fetchRan() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        return data.articles;

    } catch (error) {
        const titles = document.createElement('h1');
        titles.textContent='NO INTERNET';
        document.body.appendChild(titles)
        console.log(titles)
        

        return [];
    }
}


SeaecgButton.addEventListener('click',async()=>{
    const query = SeaecgFiled.value.trim();
    if(query !== ""){
        try{
 
         const articles= await fetchNewsQuery(query)
         displayBlog(articles)
        }catch(error){
            console.log("Error Fetching news bt query",error)
        }
    }
})
 async function fetchNewsQuery(query){
    
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}=us&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
 }





function displayBlog(articles) {
    bolgcontainer.innerHTML = "";
    articles.forEach((article) => {

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        var image=article.urlToImage 
       if(image){
        img.src=image
       }else{
        img.src='no.jpeg'
       }
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle=article.title.length>30?article.title.slice(0,30) + "...." : article.title;
        title.textContent=truncatedTitle;
        const description = document.createElement("p");
        const truncatedDE=article.description.length>120?article.description.slice(0,120) + "...." : article.description;
        description.textContent=truncatedDE;
        const authors=document.createElement("h4");
        const author1=article.publishedAt+"  Time"
        authors.textContent=author1;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(authors)
        blogCard.addEventListener('click',()=>window.open(article.url,"_blank"))
        bolgcontainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRan();
        displayBlog(articles);
    } catch (error) {
        
        console.log("Error fetching random news", error);
    }
})();
