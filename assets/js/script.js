

function getGameInfo() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2022-01-01,2023-09-30&added&page_size=18&search`
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let pageNumber = 2;
    let nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&search=`
    console.log(nextGameURL);
    
    const loadGamesBtn = $('.load-games-btn');
    loadGamesBtn.on('click', () => {
      pageNumber++;
      nextGameURL = `https://api.rawg.io/api/games?added=&dates=2022-01-01%2C2023-09-30&key=9cdfe8e7af674d6d825da9805c8c6545&page=${pageNumber}&page_size=18&search=`
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
    
          });
      }
    });
    
    displayGames(data);
  })
  
}



getGameInfo();


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


