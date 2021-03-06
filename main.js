
const audio = new Audio("https://www.myinstants.com/media/sounds/whos-that-pokemon_.mp3");
let winKeeper = 0;
let lossKeeper = 0;

function runGame () {
  // create a fetch request to grab ALL of the pokemon and store data in an array;
  const listOfFirst150Pokemon = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"
  ];
  const randomNumber = function (min, max) {
    // pokemon URLs start with 1 and end with 151
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const requestForAllPokemon = new Request(
    `https://pokeapi.co/api/v2/pokemon/${randomNumber(1, 152)}`
  );
  fetch(requestForAllPokemon)
    .then((data) => data.json())
    .then((data) => {
      // let's create an array of random pokemon answers for our game
      // lines 15-22 creates 3 other random unique pokemon names from our original list, without modifying the original list.
      const pokemonAnswers = [data.name];
      const newList = listOfFirst150Pokemon.slice();
      newList.splice(listOfFirst150Pokemon.indexOf(data.name), 1);
      for (let i = 1; i < 4; i++) {
        let removeElement = newList[randomNumber(1, 152 - i)];
        pokemonAnswers.push(removeElement);
        newList.splice(listOfFirst150Pokemon.indexOf(removeElement), 1);
      }
      pokemonAnswers.sort((a, b) => a.localeCompare(b)); // random answer choices of pokemon. I used a sort method but it's "random" since
      // the pokemon are shuffled by a sort algorithm but the user won't know it's sorted since they're checking for a name, not a number.
      // console.log(pokemonAnswers);
      // console.log(data.sprites.other["official-artwork"].front_default);

      //****START COPYING

      //*******GAME CREATION
      //GAME CONTAINER
      const gameContainer = document.createElement("div");
      gameContainer.className = "game-container";
      gameContainer.setAttribute("id", "game-Container");

      //IMAGE CONTAINER
      const imgContainer = document.createElement("div");
      imgContainer.className = "img-container";
      imgContainer.setAttribute("id", "img-Container");

      //POKEMON IMAGE
      const pokemonInstance = document.createElement("img");
      pokemonInstance.className = "pokemon-instance";
      pokemonInstance.setAttribute("id", "pokemon-Instance");
      pokemonInstance.setAttribute(
        "src",
        data.sprites.other["official-artwork"].front_default
      );
      pokemonInstance.setAttribute("style", "filter: brightness(0%)");
      //append pokemon into our image container ^
      imgContainer.append(pokemonInstance);

      //GAME BUTTONS
      //Create BUtton container
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      //instead of fake array, make it answer array
      pokemonAnswers.forEach((pokemon) => buttonGenerator(pokemon));
      //button that makes pokemon appear.
      function buttonGenerator(name) {
        const answerButton = document.createElement("button");
        answerButton.className = "answer-button";
        answerButton.innerText = name[0].toUpperCase() + name.slice(1);
        answerButton.addEventListener("click", () => {
          pokemonInstance.setAttribute("style", "filter: brightness(100%)");
          removeAnswerButtons();
        });
        //assign ID for correct/wrong answers (change 'pikachu' to data.name once inside fetch.then)
        if (name.toLowerCase() === data.name.toLowerCase()) {
          answerButton.setAttribute("id", "true-Button");
          answerButton.addEventListener("click", () => {
            //increment score, update storage API
            winKeeper += 1;
            updateWin(winKeeper)

            const teamAsh = document.createElement("img");
            teamAsh.setAttribute(
              "src",
              "https://raw.githubusercontent.com/nileswil/CodesmithHackathon2022/main/brockmistyash.png"
            );
            teamAsh.className = "teamAsh";
            setTimeout(() => {
              const answerButtons = gameContainer.querySelectorAll(".answer-button");
              answerButtons.forEach((button) => button.remove());
              gameContainer.append(teamAsh);
              createPlayAgain();
            }, 3000);
          });
        } else {
          answerButton.setAttribute("id", "false-Button");
          answerButton.addEventListener("click", () => {
            //decrement score, update storage API
            lossKeeper += 1;
            updateLoss(lossKeeper)

            const teamRocket = document.createElement("img");
            teamRocket.setAttribute(
              "src",
              "https://raw.githubusercontent.com/nileswil/CodesmithHackathon2022/35b5a534d3b3c5fafcbff66866549cb1a85db7bc/teamrocket.png"
            );
            teamRocket.className = "teamRocket";
            setTimeout(() => {
              const answerButtons = gameContainer.querySelectorAll(".answer-button");
              answerButtons.forEach((button) => button.remove());
              gameContainer.append(teamRocket);
              createPlayAgain();
            }, 3000);
          });
        }
        //append these buttons to my button container
        buttonContainer.append(answerButton);
      }

      //append all sub items to our game Container
      imgContainer.append(buttonContainer);
      gameContainer.append(imgContainer);

      //REMOVE ANSWER BUTTONS FUNCTION
      function removeAnswerButtons() {
        const answerButtons = gameContainer.querySelectorAll("#false-Button");
        answerButtons.forEach((button) => {
          // button.remove()
          button.setAttribute('style', 'opacity: 0')
        });
      }

      //createPlay again button
      function createPlayAgain() {
        const playAgainButton = document.createElement("button");
        playAgainButton.innerText = "Play Again";
        playAgainButton.className = "play-again-button";
        playAgainButton.addEventListener("click", resetGame);
        gameContainer.prepend(playAgainButton);
      }

      //RESET GAME FUNCTION
      function resetGame() {
        // gameContainer.remove();
        googleTarget2.innerText = "";
        runGame();
        audio.play();
      }

      //*******END GAME CREATION
      //insert our game container into the DOM.
      //FAKE MOCK UP
      const googleTarget = document.querySelector(".om7nvf");
      const googleTarget2 = document.querySelector(".LS8OJ");
      // console.log(googleTarget2);
      const saved = googleTarget2.innerHTML;
      googleTarget2.innerText = "";
      // if (googleTarget) googleTarget.innerHTML = "";
      if (googleTarget) googleTarget.remove();
      googleTarget2.append(gameContainer);
      // googleTarget2.setAttribute('style', 'display: flex')
      // TO BRING BACK GOOGLE STUFF
      // googleTarget.innerHTML = saved;
      //****END COPYING
    })
    .catch((error) => console.log(error));
}

runGame();
updateWin(0);
updateLoss(0);

function updateWin (score) {
  chrome.storage.local.set({ win: score }, function () {
    console.log('Win is set to ' + `${score}`);
  });
}

function updateLoss(score) {
  chrome.storage.local.set({ loss: score }, function () {
    console.log('Loss is set to ' + `${score}`);
  });
}

// updateScore(4);

// chrome.storage.local.get('enabled', data => {
//   if (data.enabled) {
//     // resetGame();
//     runGame();
//   } else {
//     // runGame()
//     //it is disabled
//   }
// });

/*
TO-DO

1. [X]finish API calling
2. [X] get a basic CSS for our images
3. [X]build a set up to load into our DOM (the elements)
4. [X] Extension loaded up and working. (proper targeting of google page for DOM manip)
5. [X]guessing functionality (answer buttons with random order)
6. [*]WIN/LOSS display
7. reload ability to play again.
8. [*]put matt/reid picture in our images. maybe team rocket. + charlie as meoff

BONUS
0. [x]Buttons as answers
1. score counter
2. make css nicer, animations etc.
3. toggle game on and off from popup? ie. click on a pokeball????
*/
