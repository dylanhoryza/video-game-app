

function getGameInfo() {
  const apiUrl = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2022-01-01,2023-09-30&added`

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayGames(data);
  })
}

getGameInfo();

function displayGames(data) {
  const gameContainer = $('#game-container');
  const gamesList = data.results;
  console.log(gamesList);
  const loadNextGames = gamesList.next;
  console.log(loadNextGames);

  for (let i = 0; i < gamesList.length; i++) {
    const games = gamesList[i];
    console.log(games)
    const name = games.name;
    const platforms = games.parent_platforms[0].platform.name;
    console.log(platforms);
    const rating = games.rating;
    const releaseDate = games.released;
    const poster = games.background_image;
    
    const gamesCard = $('<div class="col" id="game-col">');
    
    
    gamesCard.html(`
    <div class="col-lg-3 col-md-6 col-sm-12">
      <div class="item">
      <img src= ${poster} class="poster">
      <h3 class="name-title">${name}</h3>
      <div class="game-info">
      <p class="platforms">${platforms}</p>
      <p class="release-date">🗓️ ${releaseDate}</p>
      <p class="ratings">⭐ ${rating}</p>
      </div>
      </div>
    </div>
    
    `);
    gameContainer.append(gamesCard);
  }
}