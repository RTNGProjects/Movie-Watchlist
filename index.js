let movieIdsArray = []
let movieData = [];


const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const placeholderContent = document.getElementById("placeholder-content")
const movieList = document.getElementById("movies-list")

async function moviesSearch(searchInquiry) {
    const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=45182987&s=${searchInquiry}`)
    const searchData = await searchResponse.json()

    if (searchData.Search) {
        searchData.Search.map(movie => movieIdsArray.push(movie.imdbID))
        movieInfo(movieIdsArray)
    } else {
      console.log(searchData.Response)
      console.log(searchData.Error)
      errorMessage(searchData.Error)
    }
}


searchBtn.addEventListener("click", (event) => {
    event.preventDefault()
    moviesSearch(searchInput.value)
    searchInput.value = ""
  }
)


function errorMessage(errorMessage) {
  placeholderContent.innerHTML = `
   <p>${errorMessage}</p>
  `;
}

function movieInfo(id) {
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
      movieListHtml(movieData)
  })
}

function movieListHtml(movies) {
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
                <p class="watchlist-icon" id="${imdbID}"><img src="./images/add-icon.png" alt="plus-icon">Watchlist</p>
            </div>
            <div class="card-content-plot">${Plot}</div>
        </div>
    </div>
      `
  }

  movieList.innerHTML = html

  // adding event listeners to the watchlist buttons

    let addToWatchlistButtons = document.querySelectorAll('.watchlist-icon')
        for (let btn of addToWatchlistButtons) {
          btn.addEventListener('click', addToWatchlist)
        }
}

function addToWatchlist(event) {
  const plusIcon = `<img src="./images/add-icon.png" alt="plus-icon">Watchlist`

  const removeIcon = `<img src="./images/remove-icon.png" alt="remove-icon">Watchlist`

  let selectedItem = event.currentTarget.innerHTML.toString()

  if (selectedItem === plusIcon) {
    event.currentTarget.innerHTML = removeIcon
    localStorage.setItem(event.currentTarget.id, event.currentTarget.id);
  } else {
    event.currentTarget.innerHTML = plusIcon
    localStorage.removeItem(event.currentTarget.id)
  }
}
