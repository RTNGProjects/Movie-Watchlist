const placeholderBlockHtml = ` <div class="placeholder-block">
                        <p>Your watchlist is looking a little empty...</p>
                        <a class="link-to-index" href="index.html">
                        <img src="./images/add-icon.png" alt="plus-icon" />
                        Let's add some movies!</a>
                        </div>`

const watchlist = document.getElementById('watchlist');

function displayWatchlistHtml() {
    if (localStorage.length > 0) {
        watchlistArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            watchlistArray.push(localStorage.getItem(localStorage.key(i)));
        }
        movieInfo(watchlistArray)
    } else {
        watchlist.innerHTML = placeholderBlockHtml
    }
}

function displayMoviesDataHtml(movies) {
    let html = '';
    for (let movie of movies) {
    const { Title, Runtime, Genre, Poster, imdbRating, Plot, imdbID } = movie;  
    html += `
    <div class="movie-card">
        <div><img src="${Poster}" alt="movie-cover" class="movie-img"></div>
        <div>
            <div class="card-content-title">
              <h4>${Title}</h4>
              <p class="rating-icon"><img src="./images/star-icon.png" alt="rating-star">${imdbRating}</p>
            </div>
            <div class="card-content-secondary-info">
                <p>${Runtime}<span class="genre-spacing">${Genre}</span></p>
                <p class="watchlist-icon" id="${imdbID}"><img src="./images/remove-icon.png" alt="plus-icon" >Watchlist</p>
            </div>
            <div class="card-content-plot">${Plot}</div>
        </div>
    </div>
      `
    }
    watchlist.innerHTML = html

    let addToWatchlistButtons = document.querySelectorAll('.watchlist-icon')
        for (let btn of addToWatchlistButtons) {
          btn.addEventListener('click', removeFromLocalStorage)
        }
}




function removeFromLocalStorage(event) {
    localStorage.removeItem(event.currentTarget.id)
    displayWatchlistHtml()
}

function movieInfo(id) {
    let movieData = [];
    id.map(async (id) => {
      const idResponse= await fetch(`https://www.omdbapi.com/?apikey=45182987&i=${id}`)
      const idData = await idResponse.json()
      const { Title, Runtime, Genre, Poster, imdbRating, Plot, imdbID } = idData;
        
      movieData.push({
            Title,
            Runtime,
            Genre,
            Poster,
            imdbRating,
            Plot,
            imdbID
      })
      displayMoviesDataHtml(movieData)
  })
}

displayWatchlistHtml();