// Fetching medical news from a free news API (Newsdata.io as an example)
async function fetchMedicalNews() {
    try {
        const response = await fetch(
            'https://newsdata.io/api/1/news?apikey=pub_5336032aa8f955c0901f99c67a20197a4d6e0&category=health&language=en'
        );
        const data = await response.json();

        // Display the news on the page
        displayNews(data.results);
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('newsContainer').innerHTML = 'Failed to load news.';
    }
}

// Function to display news articles on the page
function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');

        newsArticle.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.link}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsArticle);
    });
}

// Call the fetch function to load news when the page loads
fetchMedicalNews();
