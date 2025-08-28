const API_BASE_URL = 'https://www.omdbapi.com/?apikey=b0e2cdd5';
const searchInput = document.getElementById('movieSearch');
const movieList = document.getElementById('movieList')

function debounce(fn, delay) {
    let timeoutId;

    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

async function searchByTitle(wordToSearch) {
    try {
        const response = await fetch(`${API_BASE_URL}&s=${wordToSearch}`).catch(error => {
            console.error('Fetch error:', error.message);
            throw error;
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        renderMovies(data);
    }
    catch (error) {
        console.error('Fetch failed:', error.message);
    }
}

function renderMovies(movies) {
    console.log('Movies:', movies);
    clearMovies();

    if (!movies.Search) {
        movieList.innerHTML = `<p>Нічого не знайдено 😕</p>`;
        return;
    }

    movies.Search.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `<img class="poster" src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p><strong>Рік:</strong> ${movie.Year}</p>
                <p><strong>Тип:</strong> ${movie.Type}</p>
            </div>
        `;

        movieList.appendChild(movieItem);
    });
}

function clearMovies() {
    movieList.innerHTML = '';
}

const debouncedSearchByTitle = debounce(searchByTitle, 1000);


searchInput.addEventListener('input', (event) => {

    if (event.target.value.length >= 3) {
        debouncedSearchByTitle(event.target.value);
    }

    if (!event.target.value.length) {
        clearMovies();
    }
});