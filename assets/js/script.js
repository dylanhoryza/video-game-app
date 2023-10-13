const gameInput = $('#search');
const formEl = $('#form');

let gameTitle = '';

const formSubmitHandler = function (event) {
  event.preventDefault();

  gameTitle = gameInput.val().trim();

  if (gameTitle) {
    getSearchedGame(gameTitle)

    gameInput.val('');
  }
};

formEl.on('submit', formSubmitHandler);

function getSearchedGame() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2017-01-01,2023-09-30&added&page_size=9&search=-${gameTitle}`
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data); 
    displayGames(data);
})
  
};


function getAllGames() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2017-01-01,2023-09-30&added&page_size=18&search`
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let pageNumber = 2;
    let nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&search`
    console.log(nextGameURL);
    
    const loadGamesBtn = $('.load-games-btn');
    loadGamesBtn.on('click', () => {
      pageNumber++;
      nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&search`;
      // Check if there is a next URL
      if (nextGameURL) {
        
        // Fetch the next set of games
        fetch(nextGameURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Display the newly fetched games
            displayGames(data);

            window.scrollTo({ top: 0, behavior: 'smooth' });
    
          });
      }
    });
    
    displayGames(data);
  })
  
};

function filterGamesRating() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2022-01-01,2023-09-30&added&page_size=18&ordering=-rating`
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let pageNumber = 2;
    let nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&ordering=-rating`
    console.log(nextGameURL);
    
    const loadGamesBtn = $('.load-games-btn');
    loadGamesBtn.on('click', () => {
      pageNumber++;
      nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&ordering=-rating`
      // Check if there is a next URL
      if (nextGameURL) {
        
        // Fetch the next set of games
        fetch(nextGameURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Display the newly fetched games
            displayGames(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
    
          });
      }
    });
    
    displayGames(data);
  })
  
};

function filterGamesNewest() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2022-01-01,2023-09-30&added&page_size=18&ordering=-released`
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let pageNumber = 2;
    let nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&ordering=-released`
    console.log(nextGameURL);
    
    const loadGamesBtn = $('.load-games-btn');
    loadGamesBtn.on('click', () => {
      pageNumber++;
      nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&ordering=-released`
      // Check if there is a next URL
      if (nextGameURL) {
        
        // Fetch the next set of games
        fetch(nextGameURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Display the newly fetched games
            displayGames(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
    
          });
      }
    });
    
    displayGames(data);
  })
  
};

$('#filter-dropdown').on('change', function() {
  const selectedFilter = $(this).val();
  // Depending on the selectedFilter, update the API request and call the API
  // to fetch the filtered data.
  if (selectedFilter === 'all') {
    // Fetch all games.
    getAllGames();
  } else if (selectedFilter === 'rating') {
    // Fetch games filtered by rating.
    filterGamesRating();
  } else if (selectedFilter === 'newest') {
    // Fetch games filtered by platform.
    filterGamesNewest();
  }
  // Add more conditions for other filters.
});






const getPlatformStr = (platforms) => {
  const platformStr = platforms.map(each => each.platform.name).join(", ");
  if(platformStr.length > 30) {
    return platformStr.substring(0,30)+"...";
  } 
  return platformStr;
}

function displayGames(data) {
  const gameContainer = $('#game-container');
  const loadGamesBtn = $('.load-games-btn');
  const gamesList = data.results;
  console.log(gamesList);
  const loadNextGames = data.next;
  console.log(loadNextGames);
  gameContainer.empty();

  for (let i = 0; i < gamesList.length; i++) {
    const games = gamesList[i];
    console.log(games)
    const name = games.name;
    const platforms = games.parent_platforms;
    console.log(platforms);
    const rating = games.rating;
    const metacritic = games.metacritic;
    const releaseDate = games.released;
    const poster = games.background_image;
    
    const gamesCard = $('<div class="col" id="game-col">');
    
    
    
    gamesCard.html(`
    <div class="col-lg-3 col-md-6 col-sm-12">
      <div class="item">
      <img src= ${poster} class="poster">
      <h3 class="name-title">${name}</h3>
      <div class="game-info">
      <p class="platforms">${getPlatformStr(platforms)}</p>
      <p class="release-date">🗓️ ${releaseDate}</p>
      <p class="ratings">⭐ ${rating}</p>
      <p class="metacritic">Metacritic: ${metacritic}%</p>
      </div>
      </div>
      
    </div>
    
    `);
    gameContainer.append(gamesCard);
   
    

  }
}

getAllGames();
filterGamesRating();
filterGamesNewest();
